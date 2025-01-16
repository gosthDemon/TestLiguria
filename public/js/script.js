// // VARS
// const menu_section = document.getElementById('menu-section');
// const body_section = document.getElementById('body-section');
// const button_menu_open = document.getElementById('button-menu-open');
// const button_menu_close = document.getElementById('button-menu-close');
// const profile_picture_container = document.getElementById('profile-picture-container');
// const profile_section = document.getElementById('profile-section');
// const button_profile_close = document.getElementById('button-profile-close');
// const icons_ligth = document.querySelectorAll('.fal');
// const items = document.querySelectorAll('.multiply .item'); //submenus
// const activeItems = document.querySelectorAll('.sub-menu li.active');

// //FUNCTIONS
// function handleResize() {
//     const screenWidth = window.innerWidth;
//     if (screenWidth < 1200 ) {
//         menu_section.classList.add('close-menu');
//         body_section.classList.add('expand-body');
//         menu_section.classList.remove('open-menu');
//     } else {
//         menu_section.classList.remove('close-menu');
//         body_section.classList.remove('expand-body');
//     }
// }
// function open_menu(){
//     menu_section.classList.add('open-menu');
// }
// function close_menu(){
//     menu_section.classList.remove('open-menu');
// }
// function open_profile(){
//     profile_section.classList.add('open-profile');
//     button_profile_close.style.display = 'block';
// }
// function close_profile(){
//     profile_section.classList.remove('open-profile');
//     button_profile_close.style.display = 'none';
// }
// //EVENTS
// window.addEventListener('resize', handleResize);
// button_menu_open.addEventListener('click',()=>{open_menu();});
// button_menu_close.addEventListener('click',()=>{close_menu();});
// profile_picture_container.addEventListener('click',()=>{open_profile();});
// button_profile_close.addEventListener('click',()=>{close_profile();});
// icons_ligth.forEach(icon => {
//     icon.addEventListener('mouseover',function(){
//         icon.classList.remove('fal');
//         icon.classList.add('far');
//     });
//     icon.addEventListener('mouseout', function() {
//         icon.classList.remove('far');
//         icon.classList.add('fal');
//     });
// });

// items.forEach(item => {
//     item.addEventListener('click',()=>{
//         const subMenu = item.nextElementSibling;
//         const liElements = subMenu.querySelectorAll('li');
//         const totalHeight = Array.from(liElements).reduce(
//             (sum, li) => sum + li.getBoundingClientRect().height + 3, //aumentamos los 3px de margin de cada elemento
//             0
//         );
//         item.classList.toggle('open');
//         subMenu.classList.toggle('open');
//         if(subMenu.classList.contains('open')){
//             subMenu.style.height = `${totalHeight}px`;
//         }else{
//             subMenu.style.height = `0px`;
//         }
//     });
// });

// activeItems.forEach(li_element=>{
//     const item_element = li_element.parentNode.parentNode.previousElementSibling;
//     item_element.click();
//     item_element.classList.add('active');
// });

// //CALLS
// handleResize();
