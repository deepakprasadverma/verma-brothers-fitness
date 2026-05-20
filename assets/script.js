// Set Current Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('bg-black/95', 'backdrop-blur-md', 'shadow-lg');
    } else {
        nav.classList.remove('bg-black/95', 'backdrop-blur-md', 'shadow-lg');
    }
});

// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// Close mobile menu on link click
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
    });
});

// AI Coach Logic
function generateWorkout() {
    const goal = document.getElementById('ai-goal').value;
    const level = document.getElementById('ai-level').value;
    const days = parseInt(document.getElementById('ai-days').value);
    
    // UI State Transition
    document.getElementById('ai-initial').classList.add('hidden');
    document.getElementById('ai-result').classList.add('hidden');
    document.getElementById('ai-loading').classList.remove('hidden');

    // Simulate AI API Call (Timeout)
    setTimeout(() => {
        document.getElementById('ai-loading').classList.add('hidden');
        document.getElementById('ai-result').classList.remove('hidden');
        
        // Update Meta Info
        const goalText = document.getElementById('ai-goal').options[document.getElementById('ai-goal').selectedIndex].text;
        const levelText = document.getElementById('ai-level').options[document.getElementById('ai-level').selectedIndex].text;
        document.getElementById('plan-meta').innerHTML = `<strong>Goal:</strong> ${goalText} | <strong>Level:</strong> ${levelText} | <strong>Schedule:</strong> ${days} Days/Week`;

        // Generate Routine Content Based on Input
        const routineContainer = document.getElementById('routine-content');
        routineContainer.innerHTML = ''; // Clear previous

        const workoutDatabase = {
            'weight-loss': [
                { title: 'HIIT Cardio + Core', details: '15m Treadmill Sprints, 3x15 Crunches, 3x1min Plank' },
                { title: 'Full Body Circuit', details: 'Kettlebell Swings, Burpees, Jump Squats (4 Rounds)' },
                { title: 'Active Recovery', details: '30m Light Jogging or Cycling, Yoga stretches' },
                { title: 'Upper Body + Cardio', details: 'Pushups, Dumbbell Rows, 20m Stairmaster' },
                { title: 'Lower Body Plyo', details: 'Box Jumps, Walking Lunges, Jump Rope' },
                { title: 'Endurance Run', details: '5KM moderate pace outdoor/treadmill run' }
            ],
            'muscle-gain': [
                { title: 'Chest & Triceps', details: 'Bench Press 4x8-10, Incline DB Press 3x10, Tricep Pushdowns 3x12' },
                { title: 'Back & Biceps', details: 'Deadlifts 4x6, Pull-ups 3xMax, Barbell Curls 4x10' },
                { title: 'Legs & Calves', details: 'Squats 4x8, Leg Press 3x12, Calf Raises 4x15' },
                { title: 'Shoulders & Abs', details: 'Overhead Press 4x8, Lateral Raises 4x15, Cable Crunches' },
                { title: 'Upper Body Focus', details: 'Incline Bench, T-Bar Rows, Dips 3xFailure' },
                { title: 'Lower Body Focus', details: 'Front Squats, Romanian Deadlifts, Leg Extensions' }
            ],
            'strength': [
                { title: 'Heavy Squat Day', details: 'Squat 5x5 (80% 1RM), Leg Press 3x8, Core work' },
                { title: 'Heavy Bench Day', details: 'Bench Press 5x5, Close Grip Bench 3x8, Face Pulls' },
                { title: 'Heavy Deadlift Day', details: 'Deadlift 1x5/3x3, Barbell Rows 4x6, Planks' },
                { title: 'Overhead & Accessory', details: 'OHP 5x5, Pull-ups weighted 3x5, Bicep Isolations' },
                { title: 'Squat/Bench Volume', details: 'Squat 3x10 (60%), Bench 3x10 (60%)' },
                { title: 'Rest / Mobility', details: 'Foam rolling, dynamic stretching, light walk' }
            ],
            'endurance': [
                { title: 'Long Steady Distance', details: '45-60m steady pace cycling or running (Zone 2)' },
                { title: 'Tempo Training', details: '10m warmup, 20m Tempo Pace, 10m cooldown' },
                { title: 'Interval Sprints', details: '8x400m sprints with 1m rest between' },
                { title: 'Cross-Training', details: '30m Rowing, 20m Skipping Rope' },
                { title: 'Hill Repeats', details: '10x hill sprints or high incline treadmill' },
                { title: 'Bodyweight Endurance', details: '100 Pushups, 200 Squats, 100 Situps for time' }
            ]
        };

        let selectedPlan = workoutDatabase[goal];
        
        // Adjust intensity text based on level
        let repMultiplier = level === 'beginner' ? ' (Keep weight light)' : (level === 'advanced' ? ' (Push to failure)' : '');

        for(let i=0; i<days; i++) {
            const dayData = selectedPlan[i % selectedPlan.length]; // Loop if days > available unique routines
            
            const dayEl = document.createElement('div');
            dayEl.className = 'bg-dark-card p-4 rounded-lg border-l-4 border-brand';
            dayEl.innerHTML = `
                <div class="flex justify-between items-center mb-2">
                    <span class="font-bold text-white tracking-wide">DAY ${i+1}</span>
                    <span class="text-xs bg-dark px-2 py-1 rounded text-brand uppercase">${dayData.title}</span>
                </div>
                <p class="text-gray-400 text-sm">${dayData.details} <span class="text-gray-500 italic">${repMultiplier}</span></p>
            `;
            routineContainer.appendChild(dayEl);
        }

        // Add Rest Days to fill up the week visually
        if(days < 7) {
            const restDays = 7 - days;
            const restEl = document.createElement('div');
            restEl.className = 'bg-dark-card p-4 rounded-lg border-l-4 border-gray-600 opacity-70';
            restEl.innerHTML = `
                <div class="flex justify-between items-center mb-2">
                    <span class="font-bold text-gray-400 tracking-wide">REMAINING ${restDays} DAY(S)</span>
                    <span class="text-xs bg-dark px-2 py-1 rounded text-gray-400 uppercase">Recovery</span>
                </div>
                <p class="text-gray-500 text-sm">Focus on sleep, hydration, and light mobility work (stretching/walking).</p>
            `;
            routineContainer.appendChild(restEl);
        }

    }, 1500); // 1.5s delay to simulate AI processing
}