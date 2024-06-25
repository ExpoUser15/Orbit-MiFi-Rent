const menu = document.querySelector('.menu'),
sidebar = document.querySelector('aside'),
closeSidebarBtn = document.querySelector('.sidebar-close');

menu.addEventListener('click', () => {
    sidebar.classList.replace('-translate-x-[2000px]', '-translate-x-0');
});

closeSidebarBtn.addEventListener('click', () => {
    sidebar.classList.replace('-translate-x-0', '-translate-x-[2000px]');
})