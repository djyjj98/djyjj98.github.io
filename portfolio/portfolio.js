document.addEventListener('DOMContentLoaded', () => {
    /* PART 1: SETUP VARIABLES
    --------------------------------------------------
    */

    const introduction = document.getElementById('introduction');
    const editIntroButton = document.getElementById('edit-intro');
    const projectList = document.getElementById('project-list');
    const skillList = document.getElementById('skill-list');
    const addSkillButton = document.getElementById('add-skill');
    const newSkillInput = document.getElementById('new-skill');
    const skillLevelInput = document.getElementById('skill-level');
    const contactForm = document.getElementById('contact-form');
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    /* PART 2: IMPLEMENT DYNAMIC PROJECTS AND SKILLS
    --------------------------------------------------
    */

    const projects = [
        {
            title: 'Project 1: JavaScript Selectors',
            description: 'A DOM manipulation project using querySelector, querySelectorAll, class updates, and text changes.',
            link: '../index.html'
        },
        {
            title: 'Project 2: Form Validation',
            description: 'A web form project that validates user input and displays helpful feedback using JavaScript.',
            link: '../Project 2/index.html'
        },
        {
            title: 'Project 3: Ticket Purchasing',
            description: 'An event ticket purchasing page that calculates totals and handles user input with JavaScript.',
            link: '../Project 3/event_registration.html'
        }
    ];

    const skills = [
        { name: 'HTML', level: 85 },
        { name: 'CSS', level: 80 },
        { name: 'JavaScript', level: 75 },
        { name: 'Web Design', level: 80 }
    ];

    const savedIntro = localStorage.getItem('introduction');
    if (savedIntro) {
        introduction.textContent = savedIntro;
    }

    function displayProjects() {
        projectList.innerHTML = '';
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}">View Project</a>
            `;

            projectList.appendChild(projectCard);
        });
    }

    function displaySkills() {
        skillList.innerHTML = '';
        skills.forEach(skill => {
            const skillItem = document.createElement('li');
            skillItem.innerHTML = `
                <span>${skill.name}</span>
                <div class="skill-bar">
                    <div class="skill-bar-fill" style="width: ${skill.level}%;"></div>
                </div>
            `;

            skillList.appendChild(skillItem);
        });
    }

    /* PART 3: IMPLEMENT INTRO TEXT EDITING
    --------------------------------------------------
    */

    editIntroButton.addEventListener('click', () => {
        const newIntro = prompt('Enter your new introduction:', introduction.textContent);

        if (newIntro !== null && newIntro.trim() !== '') {
            introduction.textContent = newIntro.trim();
            localStorage.setItem('introduction', newIntro.trim());
        }
    });

    /* PART 4: IMPLEMENT SKILLS DISPLAY AND CONTACT FORM FUNCTIONALITY
    --------------------------------------------------
    */

    addSkillButton.addEventListener('click', () => {
        const newSkill = newSkillInput.value.trim();
        const skillLevel = parseInt(skillLevelInput.value, 10);
        if (newSkill && skillLevel >= 0 && skillLevel <= 100) {
            skills.push({ name: newSkill, level: skillLevel });
            displaySkills();
            newSkillInput.value = '';
            skillLevelInput.value = '';
        } else {
            alert('Please enter a skill name and a proficiency level between 0 and 100.');
        }
    });

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please complete all fields before submitting the form.');
            return;
        } 
        
        try {
        	const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            	method: 'POST',
            	headers: {
               	 'Content-Type': 'application/json'
        	    },
           		body: JSON.stringify({
               		 name: name,
              		 email: email,
               		 message: message
           		})
       	 });

       	 if (response.ok) {
        	    alert('Thank you! Your message was submitted successfully.');
        	    contactForm.reset();
      	  } else {
            	alert('There was a problem submitting your message. Please try again.');
       	 }
   	 } catch (error) {
       	 alert('There was a network error. Please try again later.');
   	 }
	});

    /* PART 5: IMPLEMENT THEME TOGGLE
    --------------------------------------------------
    */

    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Do not edit any code below this line
    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        }
    }

    applySavedTheme();
    displayProjects();
    displaySkills();
});
