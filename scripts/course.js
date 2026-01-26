// Alias file `course.js` required by assignment — copied from `courses.js`
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [ 'Python' ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development.',
        technology: [ 'HTML', 'CSS' ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Organized programming using functions.',
        technology: [ 'Python' ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Introduction to classes and objects.',
        technology: [ 'C#' ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Build dynamic websites using JavaScript.',
        technology: [ 'HTML', 'CSS', 'JavaScript' ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Focus on UX, accessibility and performance.',
        technology: [ 'HTML', 'CSS', 'JavaScript' ],
        completed: false
    }
];

document.addEventListener('DOMContentLoaded', function () {
  var listEl = document.getElementById('courses-list');
  var creditsEl = document.getElementById('creditsTotal');
  var filterBtns = Array.from(document.querySelectorAll('.filter-btn'));

  function render(filtered) {
    if (!listEl) return;
    listEl.innerHTML = '';
    filtered.forEach(function (c) {
      var card = document.createElement('div');
      card.className = 'course-card' + (c.completed ? ' completed' : '');
      card.innerHTML = '<strong>' + c.subject + ' ' + c.number + '</strong> — ' + c.title + '<div class="muted">Credits: ' + c.credits + ' • ' + (c.subject || '') + '</div>';
      listEl.appendChild(card);
    });
    var total = filtered.reduce(function (acc, c) { return acc + (c.credits || 0); }, 0);
    if (creditsEl) creditsEl.textContent = total;
  }

  function applyFilter(filter) {
    var filtered = courses.filter(function (c) {
      if (filter === 'all') return true;
      return c.subject === filter;
    });
    render(filtered);
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  applyFilter('all');
});
