async function loadMembers() {
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error('Network response was not ok');
    const members = await res.json();
    renderMembers(members);
  } catch (err) {
    console.error('Failed to load members:', err);
    const list = document.getElementById('member-list');
    if (list) list.innerHTML = '<p>Unable to load members at this time.</p>';
  }
}

function renderMembers(members) {
  const list = document.getElementById('member-list');
  if (!list) return;
  list.innerHTML = '';
  members.forEach(m => {
    const el = document.createElement('article');
    el.className = 'member';
    el.innerHTML = `
      <img src="images/${m.image}" alt="${m.name} logo">
      <div>
        <h3>${m.name}</h3>
        <div class="meta">${m.address}<br>${m.phone} • <a href="${m.website}" target="_blank" rel="noopener">Website</a></div>
        <div class="meta">Membership: ${levelLabel(m.level)}</div>
      </div>
    `;
    list.appendChild(el);
  });
}

function levelLabel(n){
  if(n===3) return 'Gold';
  if(n===2) return 'Silver';
  return 'Member';
}

function setupViewToggle(){
  const gridBtn = document.getElementById('gridBtn');
  const listBtn = document.getElementById('listBtn');
  const members = document.getElementById('members');
  if(!gridBtn||!listBtn||!members) return;
  gridBtn.addEventListener('click', ()=>{
    gridBtn.classList.add('active'); listBtn.classList.remove('active');
    members.classList.remove('list'); members.classList.add('grid');
  });
  listBtn.addEventListener('click', ()=>{
    listBtn.classList.add('active'); gridBtn.classList.remove('active');
    members.classList.remove('grid'); members.classList.add('list');
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  setupViewToggle();
  loadMembers();
});
