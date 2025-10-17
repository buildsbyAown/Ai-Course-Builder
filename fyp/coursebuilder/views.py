from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
from dotenv import load_dotenv
import markdown
from groq import Groq
import re
import requests
from urllib.parse import urlparse, parse_qs

from .models import Course, Week, Day, UserProgress, User
from .schema.schema import InputSchema

load_dotenv()
api_key = os.getenv("GROQ_API_KEY")

def home(request):
    return HttpResponse("This is home page of course builder")

from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

def register_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        confirm = request.POST.get("confirm")

        if password != confirm:
            messages.error(request, "Passwords do not match.")
            return redirect("register")

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
            return redirect("register")

        user = User.objects.create_user(username=username, password=password)
        user.save()
        messages.success(request, "Account created successfully. Please log in.")
        return redirect("login")

    return render(request, "register.html")

def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("dashboard")
        else:
            messages.error(request, "Invalid username or password.")
            return redirect("login")

    return render(request, "login.html")

@login_required
def logout_view(request):
    logout(request)
    return redirect("login")

@login_required
def course_list(request):
    courses = Course.objects.all()
    return render(request, "course_list.html", {"courses": courses})

@login_required
def enroll_course(request, course_id):
    course = get_object_or_404(Course, id=course_id)
    if not UserProgress.objects.filter(user=request.user, course=course).exists():
        UserProgress.objects.create(user=request.user, course=course)
        messages.success(request, f"Enrolled in {course.title}")
    else:
        messages.info(request, "You are already enrolled in this course.")
    return redirect("dashboard")

def split_weeks(content: str) -> dict:
    pattern = r"(Week\s*\d+)([\s\S]*?)(?=(Week\s*\d+)|$)"
    matches = re.findall(pattern, content, re.IGNORECASE)
    weeks = {}
    for match in matches:
        week_title = match[0].strip()
        week_content = match[1].strip()
        weeks[week_title] = week_content
    return weeks

def beautify_response(content: str) -> str:
    html_output = markdown.markdown(
        content,
        extensions=["extra", "nl2br", "sane_lists"]
    )
    return html_output

def get_youtube_thumbnail(video_url):
    """Extract YouTube thumbnail from video URL"""
    try:
        parsed_url = urlparse(video_url)
        if parsed_url.hostname in ['www.youtube.com', 'youtube.com']:
            video_id = parse_qs(parsed_url.query).get('v', [None])[0]
        elif parsed_url.hostname in ['www.youtu.be', 'youtu.be']:
            video_id = parsed_url.path[1:]
        else:
            return None
        
        if video_id:
            return f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg"
    except:
        pass
    return None

def search_youtube_video(topic):
    """
    Search YouTube for a relevant educational video on the given topic
    Returns: (video_url, thumbnail_url) or (None, None) if no results
    """
    try:
        api_key = os.getenv("YOUTUBE_API_KEY")
        if not api_key:
            print("YouTube API key not found")
            return None, None
        
        # Prepare search query - focus on educational content
        search_query = f"{topic} tutorial education learning course"
        
        # Make API request
        url = "https://www.googleapis.com/youtube/v3/search"
        params = {
            'part': 'snippet',
            'q': search_query,
            'type': 'video',
            'maxResults': 1,
            'key': api_key,
            'videoDuration': 'medium',  # medium length videos (4-20 minutes)
            'relevanceLanguage': 'en',
            'videoEmbeddable': 'true',  # Only get embeddable videos
            'videoSyndicated': 'true'   # Only get videos that can be played outside youtube.com
        }
        
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        
        data = response.json()
        
        if data.get('items'):
            video_id = data['items'][0]['id']['videoId']
            thumbnail_url = data['items'][0]['snippet']['thumbnails']['high']['url']
            
            # Create embed URL
            video_url = f"https://www.youtube.com/embed/{video_id}"
            
            print(f"Found YouTube video for topic: {topic}")
            return video_url, thumbnail_url
        
        print(f"No YouTube results for topic: {topic}")
        return None, None
        
    except Exception as e:
        print(f"YouTube API error for topic '{topic}': {str(e)}")
        return None, None

def gen_outline(data):
    client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
    
    title = data.title
    level_has = data.level_has
    level_required = data.level_required
    duration = data.duration
    language = data.language
    hours_per_day = data.hours_per_day
    
    total_weeks = int(duration) * 4
    
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"""
                
                Create an extremely detailed course outline for a course titled "{title}".  
                The course should be designed for learners with a "{level_has}" level of knowledge and aims to bring them to a "{level_required}" level.  
                The outline generated should be in "{language}" and will span approximately "{duration}" months ({total_weeks} weeks).  
                The student can study for {hours_per_day} hours per day.

                ⚡ Important Instructions:
                - The total number of weeks = {duration} * 4 = {total_weeks}.  
                - Generate an outline that covers **all weeks without skipping**.  
                - Use clear headings in the exact format:  
                ## Week 1  
                ## Week 2  
                ... until ## Week {total_weeks}.  

                - For each week, provide **exactly 6 bullet points** (one for each day of the week, assuming one rest day).  
                - Ensure progression is logical from beginner to advanced concepts.  
                - Include both theoretical concepts and practical exercises.
                - Consider that the student has {hours_per_day} hours available per day when planning the content.
                - Format the response in Markdown.  

                Example structure:

                ## Week 1
                - Day 1: Introduction to [Topic] - Basic concepts and definitions
                - Day 2: [Topic] Fundamentals - Core principles and examples
                - Day 3: Practical Exercise - Hands-on practice with guidance
                - Day 4: Advanced Concepts - Deeper understanding
                - Day 5: Real-world Application - How to apply in practice
                - Day 6: Review and Assessment - Test your knowledge

                ## Week {total_weeks}
                - Day 1: [Advanced Topic] - Master level concepts
                - Day 2: [Advanced Topic] - Implementation strategies
                - Day 3: Project Work - Build a complete solution
                - Day 4: Optimization Techniques - Improve performance
                - Day 5: Industry Best Practices - Professional standards
                - Day 6: Final Review - Comprehensive assessment
                """,
            }
        ],
        model="llama-3.1-8b-instant",
        temperature=0.7,
    )

    response = chat_completion.choices[0].message.content
    return response

def get_weekly_detail(week_content, week_number, hours_per_day):
    client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
    
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"""
                Create a detailed 6-day learning plan for Week {week_number} with the following topics: {week_content}
                
                The student has {hours_per_day} hours available per day for study.
                
                ⚡ CRITICAL FORMATTING REQUIREMENTS:
                - You MUST use EXACTLY this format for each day, no variations:
                
                ## Day 1: [Specific Topic Title]
                **Topic:** [Clear, concise topic description for video search]
                **Content:**
                [Detailed learning content for {hours_per_day} hours of study including:
                - Clear learning objectives
                - Theoretical explanations
                - Practical examples
                - Hands-on exercises
                - Real-world applications
                Make this comprehensive and actionable]
                
                ## Day 2: [Specific Topic Title]
                **Topic:** [Clear topic description]
                **Content:**
                [Detailed content for {hours_per_day} hours...]
                
                Continue this exact pattern for all 6 days.
                
                IMPORTANT:
                - Each day MUST start with "## Day X: " exactly
                - Each day MUST have "**Topic:**" on the next line with a clear topic description
                - Each day MUST have "**Content:**" on the line after that
                - Content should be detailed enough for {hours_per_day} hours of study
                - Include specific examples, exercises, and practical applications
                - Make each day's content self-contained and comprehensive
                - Ensure logical progression from day to day
                - The topic line should be specific enough to find relevant educational videos
                """,
            }
        ],
        model="llama3-8b-8192",
        temperature=0.3,
    )

    response = chat_completion.choices[0].message.content
    print(f"Week {week_number} generated content:")
    print(response)
    return response

def parse_daily_content(weekly_detail, week_number):
    """Parse the weekly detail into individual days and search for YouTube videos"""
    days = []
    
    # Pattern to extract day information
    day_pattern = r"## Day\s*(\d+):\s*([^\n]+)(?:\n\*\*Topic:\*\*\s*([^\n]*))?(?:\n\*\*Content:\*\*\s*([\s\S]*?))(?=## Day\s*\d+:|$)"
    
    matches = re.findall(day_pattern, weekly_detail, re.IGNORECASE)
    
    print(f"Found {len(matches)} days in weekly detail for week {week_number}")
    
    for match in matches:
        try:
            day_number = int(match[0])
            title = match[1].strip()
            topic = match[2].strip() if match[2] else title
            content = match[3].strip() if match[3] else "Content not available"
            
            # Search for YouTube video using the topic
            print(f"Searching YouTube video for: {topic}")
            video_url, video_thumbnail = search_youtube_video(topic)
            
            # Clean up content - remove any remaining markdown artifacts
            content = re.sub(r'\*\*|\*|`', '', content)
            
            # Convert content to HTML
            content_html = markdown.markdown(content)
            
            days.append({
                'day_number': day_number,
                'title': title,
                'video_url': video_url or "",
                'video_thumbnail': video_thumbnail or "",
                'content': content_html
            })
            
            print(f"Parsed Day {day_number}: {title} - Video: {bool(video_url)}")
            
        except Exception as e:
            print(f"Error parsing day: {e}")
            continue
    
    # If no days were found with the main pattern, try alternative parsing
    if not days:
        days = alternative_parse_daily_content(weekly_detail, week_number)
    
    return days

def alternative_parse_daily_content(weekly_detail, week_number):
    """Alternative parsing method if the main one fails"""
    days = []
    
    # Split by any day-like pattern
    day_sections = re.split(r'## Day\s*\d+:', weekly_detail)
    
    # Skip the first element (content before first day)
    for i, section in enumerate(day_sections[1:], 1):
        try:
            # Extract title (first line after day marker)
            lines = section.strip().split('\n')
            title = lines[0].strip() if lines else f"Week {week_number} Day {i}"
            
            # Use title as topic for video search
            print(f"Alternative search - YouTube video for: {title}")
            video_url, video_thumbnail = search_youtube_video(title)
            
            # Collect content lines
            content_lines = []
            for line in lines[1:]:  # Skip the title line
                if line.strip() and not line.startswith('**'):
                    content_lines.append(line.strip())
            
            content_text = '\n\n'.join(content_lines) if content_lines else f"Detailed content for {title}."
            content_html = markdown.markdown(content_text)
            
            days.append({
                'day_number': i,
                'title': f"Day {i}: {title}",
                'video_url': video_url or "",
                'video_thumbnail': video_thumbnail or "",
                'content': content_html
            })
            
        except Exception as e:
            print(f"Error in alternative parsing for day {i}: {e}")
            continue
    
    return days

def create_fallback_days(week_content, week_number, hours_per_day):
    """Create fallback day content when AI generation fails"""
    days = []
    # Extract topics from week content
    topics = []
    for line in week_content.split('\n'):
        if line.strip().startswith('-'):
            topic = line.replace('-', '').strip()
            if topic:
                topics.append(topic)
    
    # Ensure we have exactly 6 topics
    while len(topics) < 6:
        topics.append(f"Week {week_number} Advanced Topic {len(topics) + 1}")
    topics = topics[:6]
    
    for i in range(1, 7):
        topic = topics[i-1]
        
        # Search for YouTube video for this topic
        print(f"Fallback search - YouTube video for: {topic}")
        video_url, video_thumbnail = search_youtube_video(topic)
        
        content_html = f"""
        <div class="fallback-content">
            <h5>Learning Objectives</h5>
            <ul>
                <li>Understand the key concepts of {topic}</li>
                <li>Apply {topic} in practical scenarios</li>
                <li>Complete exercises to reinforce learning</li>
            </ul>
            
            <h5>Study Plan ({hours_per_day} hours)</h5>
            <ol>
                <li><strong>30 minutes:</strong> Review theoretical concepts</li>
                <li><strong>45 minutes:</strong> Work through examples and case studies</li>
                <li><strong>45 minutes:</strong> Complete practical exercises</li>
            </ol>
            
            <h5>Key Concepts</h5>
            <p>Today we'll focus on mastering {topic}. This includes understanding the fundamental principles and learning how to apply them in real-world scenarios.</p>
            
            <h5>Practical Exercise</h5>
            <p>Create a small project or complete exercises that demonstrate your understanding of {topic}.</p>
            
            <h5>Additional Resources</h5>
            <ul>
                <li>Review the course materials</li>
                <li>Practice with online exercises</li>
                <li>Join discussion forums for help</li>
            </ul>
        </div>
        """
        
        days.append({
            'day_number': i,
            'title': f"Day {i}: {topic}",
            'video_url': video_url or "",
            'video_thumbnail': video_thumbnail or "",
            'content': content_html
        })
    
    return days

@login_required
def course_input(request):
    if request.method == "POST":
        title = request.POST.get("title")
        duration = request.POST.get("duration")
        hours_per_day = request.POST.get("hours_per_day", 2)
        level_has = request.POST.get("level_has")
        level_required = request.POST.get("level_required")
        language = request.POST.get("language")
        
        try:
            data = InputSchema(
                title=title,
                duration=duration,
                hours_per_day=hours_per_day,
                level_has=level_has,
                level_required=level_required,
                language=language
            )
            
            # Generate course outline
            outline = gen_outline(data)
            weeks_content = split_weeks(outline)
            
            # Save course to database
            course = Course.objects.create(
                title=title,
                duration=duration,
                hours_per_day=hours_per_day,
                level_has=level_has,
                level_required=level_required,
                language=language,
                outline=outline
            )
            
            # Create week objects
            for week_title, week_content in weeks_content.items():
                week_number_match = re.search(r'\d+', week_title)
                if week_number_match:
                    week_number = int(week_number_match.group())
                    Week.objects.create(
                        course=course,
                        week_number=week_number,
                        title=week_title,
                        content=week_content
                    )
            
            # Enroll user in the course
            UserProgress.objects.create(
                user=request.user,
                course=course,
                current_week=1,
                current_day=1
            )
            
            messages.success(request, f"Course '{title}' created successfully!")
            return redirect('course_detail', course_id=course.id)
        
        except Exception as e:
            messages.error(request, f"Error creating course: {str(e)}")
            return redirect('course_create')
    
    return render(request, "course_form.html")

@login_required
def dashboard(request):
    user_progress = UserProgress.objects.filter(user=request.user).select_related('course')
    
    progress_data = []
    total_courses = user_progress.count()
    completed_courses = 0
    total_progress = 0
    incomplete_count = 0
    
    for progress in user_progress:
        progress_percentage = progress.get_progress_percentage()
        progress_data.append({
            'course': progress.course,
            'progress': progress_percentage,
            'current_week': progress.current_week,
            'current_day': progress.current_day,
            'is_completed': progress.is_completed
        })
        
        if progress.is_completed:
            completed_courses += 1
        else:
            incomplete_count += 1
            total_progress += progress_percentage
    
    # Calculate average progress for incomplete courses
    average_progress = total_progress / incomplete_count if incomplete_count > 0 else 0
    
    return render(request, 'dashboard.html', {
        'progress_data': progress_data,
        'total_courses': total_courses,
        'completed_courses': completed_courses,
        'average_progress': average_progress
    })

@login_required
def course_detail(request, course_id):
    course = get_object_or_404(Course, id=course_id)
    user_progress = get_object_or_404(UserProgress, user=request.user, course=course)
    weeks = course.weeks.all().order_by('week_number')
    
    return render(request, 'course_detail.html', {
        'course': course,
        'user_progress': user_progress,
        'weeks': weeks
    })

@login_required
def week_detail(request, course_id, week_number):
    course = get_object_or_404(Course, id=course_id)
    week = get_object_or_404(Week, course=course, week_number=week_number)
    user_progress = get_object_or_404(UserProgress, user=request.user, course=course)
    
    # Generate daily content if not already generated
    if not week.days.exists():
        try:
            weekly_detail = get_weekly_detail(week.content, week_number, course.hours_per_day)
            days_data = parse_daily_content(weekly_detail, week_number)
            
            # If parsing failed, use fallback
            if not days_data:
                days_data = create_fallback_days(week.content, week_number, course.hours_per_day)
                messages.info(request, "Using enhanced content format for this week.")
            
            for day_data in days_data:
                Day.objects.create(
                    week=week,
                    day_number=day_data['day_number'],
                    title=day_data['title'],
                    content=day_data['content'],
                    video_url=day_data['video_url'],
                    video_thumbnail=day_data['video_thumbnail']
                )
                
        except Exception as e:
            messages.error(request, f"Error generating daily content: {str(e)}")
            # Create fallback content even if AI fails completely
            days_data = create_fallback_days(week.content, week_number, course.hours_per_day)
            for day_data in days_data:
                Day.objects.create(
                    week=week,
                    day_number=day_data['day_number'],
                    title=day_data['title'],
                    content=day_data['content'],
                    video_url=day_data['video_url'],
                    video_thumbnail=day_data['video_thumbnail']
                )
    
    days = week.days.all().order_by('day_number')
    
    return render(request, 'week_detail.html', {
        'course': course,
        'week': week,
        'days': days,
        'user_progress': user_progress
    })

@login_required
@csrf_exempt
def update_progress(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            course_id = data.get('course_id')
            day_id = data.get('day_id')
            
            course = get_object_or_404(Course, id=course_id)
            day = get_object_or_404(Day, id=day_id)
            user_progress = get_object_or_404(UserProgress, user=request.user, course=course)
            
            # Update completed days
            if str(day_id) not in user_progress.completed_days:
                user_progress.completed_days.append(str(day_id))
            
            # Update current week and day
            user_progress.current_week = day.week.week_number
            user_progress.current_day = day.day_number
            
            # Check if course is completed
            total_days = course.weeks.count() * 6
            if len(user_progress.completed_days) >= total_days:
                user_progress.is_completed = True
            
            user_progress.save()
            
            return JsonResponse({
                'success': True,
                'progress_percentage': user_progress.get_progress_percentage()
            })
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return JsonResponse({'success': False})