import Starter from '../views/starter/starter.jsx';
// ui components
import Alerts from '../views/ui-components/alert.jsx';
import Badges from '../views/ui-components/badge.jsx';
import Buttons from '../views/ui-components/button.jsx';
import Cards from '../views/ui-components/cards.jsx';
import LayoutComponent from '../views/ui-components/layout.jsx';
import PaginationComponent from '../views/ui-components/pagination.jsx';
import PopoverComponent from '../views/ui-components/popover.jsx';
import TooltipComponent from '../views/ui-components/tooltip.jsx';
import Events from '../views/ui-components/events.jsx';
import SignInForm from '../views/Landing/Landing';
import Posts from '../views/ui-components/posts.jsx';
import PostEditPage from '../views/ui-components/post-edit-page';
import UserInfoPage from '../views/ui-components/user-info';
import AddNewPostPage from '../views/ui-components/add-new-post';
import TutorPage from '../views/ui-components/tutors';

var ThemeRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'ti-loop',
    component: Starter
  },
  {
    path: '/users',
    name: "Users",
    icon: 'mdi mdi-account',
    component: Events
  },
  {
    path: '/tutors',
    name: 'Tutors',
    icon: 'mdi mdi-food-apple',
    component: TutorPage
  },
  {
    path: '/signin',
    name: 'SignIn',
    icon: 'mdi mdi-laptop-chromebook',
    component: SignInForm,
  },
  {
    path: '/posts',
    name: 'Posts',
    icon: 'mdi mdi-animation',
    component: Posts
  },
  {
    path: '/edit',
    name: 'PostEditPage',
    icon: 'mdi mdi-laptop-chromebook',
    component: PostEditPage
  },
  {
    path: '/userinfo',
    name: 'UserInfoPage',
    icon: '',
    component: UserInfoPage
  },
  {
    path: '/addnewpost',
    name: 'AddNewPostPage',
    icon: '',
    component: AddNewPostPage
  },
  { path: '/', pathTo: '/signin', name: 'SignIn', redirect: true }
];

export const nonAuthRoutes = [
  {
    path: '/signin',
    name: 'SignIn',
    icon: 'mdi mdi-laptop-chromebook',
    component: SignInForm,
  },
  { path: '/', pathTo: '/signin', name: 'SignIn', redirect: true }
]


export default ThemeRoutes;



// old components
/*{
  path: '/alert',
  name: 'Alerts',
  icon: 'mdi mdi-comment-processing-outline',
  component: Alerts
},
{
  path: '/badge',
  name: 'Badges',
  icon: 'mdi mdi-arrange-send-backward',
  component: Badges
},
{
  path: '/button',
  name: 'Buttons',
  icon: 'mdi mdi-toggle-switch',
  component: Buttons
},
{
  path: '/card',
  name: 'Cards',
  icon: 'mdi mdi-credit-card-multiple',
  component: Cards
},
{
  path: '/grid',
  name: 'Grid',
  icon: 'mdi mdi-apps',
  component: LayoutComponent
},
{
  path: '/pagination',
  name: 'Pagination',
  icon: 'mdi mdi-priority-high',
  component: PaginationComponent
},
{
  path: '/popover',
  name: 'Popover',
  icon: 'mdi mdi-pencil-circle',
  component: PopoverComponent
},
{
  path: '/ui-components/tooltip',
  name: 'Toltips',
  icon: 'mdi mdi-image-filter-vintage',
  component: TooltipComponent
},
*/