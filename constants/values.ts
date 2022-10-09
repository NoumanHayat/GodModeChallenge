/* eslint-disable @typescript-eslint/no-var-requires */

const trophyImage = require('../assets/images/trophy.png');
const exerciseImage = require('../assets/temp/excercise-banner.png');
const flag = require('../assets/temp/us-flag.png');
const ad = require('../assets/temp/ad.png');
const splash_image = require('../assets/temp/splash_image.png');

const userProfilePic = 'https://fakeface.rest/thumb/view?gender=female&minimum_age=30';

const challengeParticipants = [
  {
    name: 'Sara',
    image_url: 'https://fakeface.rest/thumb/view?gender=female&minimum_age=30',
    value: '28',
    duration: '8:27 Minutes'
  },
  {
    name: 'You',
    image_url: 'https://fakeface.rest/thumb/view?gender=female&minimum_age=20',
    value: '45',
    duration: '9:40 Minutes'
  }
];

const challengeParticipantsResults = [
  {
    name: 'Sophia',
    image_url: 'https://fakeface.rest/thumb/view?gender=female&minimum_age=30',
    duration: '8:27 Minutes'
  },
  {
    name: 'Sara',
    image_url: 'https://fakeface.rest/thumb/view?gender=female&minimum_age=20',
    duration: '9:40 Minutes'
  }
];

const invite = {
  name: 'Sara',
  image_url: 'https://fakeface.rest/thumb/view?gender=female&minimum_age=30'
};

const friends = [
  {
    name: 'Saman',
    image_url: 'https://fakeface.rest/thumb/view?gender=female&minimum_age=31'
  },
  {
    name: 'Alie',
    image_url: 'https://fakeface.rest/thumb/view?gender=female&minimum_age=22'
  },
  {
    name: 'John',
    image_url: 'https://fakeface.rest/thumb/view?gender=male&minimum_age=26'
  },
  {
    name: 'Smith',
    image_url: 'https://fakeface.rest/thumb/view?gender=male&minimum_age=17'
  },
  {
    name: 'Baig',
    image_url: 'https://fakeface.rest/thumb/view?gender=male&minimum_age=28'
  }
];

const exercises = [
  {
    Day: 1,
    title: 'PushUps',
    subtitle: '30 seconds',
    image: 'https://img.livestrong.com/630x/photos.demandstudios.com/getty/article/83/169/488379514.jpg',
    type: 'excersise_item',
    isDone: false,
    videoUrl: 'https://media.w3.org/2010/05/video/movie_300.mp4',
    xp: 10
  },
  {
    Day: 1,
    title: 'PullUps',
    subtitle: '30 seconds',
    image: 'https://blogs.rdxsports.com/wp-content/uploads/2016/05/pull-up-e1568797299481.jpg',
    type: 'excersise_item',
    isDone: false,
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    xp: 7
  },
  {
    Day: 1,
    title: 'Squats',
    subtitle: '30 seconds',
    image:
      'https://phantom-marca.unidadeditorial.es/d356cd1ecae8c31df9b7b1e3303abfc7/crop/0x9/612x352/resize/828/f/webp/assets/multimedia/imagenes/2022/03/27/16483840670850.jpg',
    type: 'excersise_item',
    isDone: false,
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    xp: 100
  },
  {
    Day: 1,
    title: 'SitUps',
    subtitle: '30 seconds',
    image: 'https://cdn.mos.cms.futurecdn.net/WYnDy25TYWH6yvDzzsUxW9.jpg',
    type: 'excersise_item',
    isDone: false,
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    xp: 55
  },
  {
    Day: 1,
    title: 'Lunges',
    subtitle: '30 seconds',
    image: 'https://media.gq.com/photos/59fcc9486c531f2c62ea3e9c/1:1/w_1500,h_1500,c_limit/gq-lunge.jpg',
    type: 'excersise_item',
    isDone: false,
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    xp: 0
  },
  {
    Day: 1,
    title: 'JumpingJacks',
    subtitle: '30 seconds',
    image: 'https://www.researchgate.net/profile/Mohammed-Abou-Elmagd/publication/341734848/figure/fig1/AS:896516470362114@1590757591713/Sample-of-Jumping-Jacks-Exercise-4.png',
    type: 'excersise_item',
    isDone: false,
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    xp: 60
  },
  {
    Day: 1,
    title: 'Planks',
    subtitle: '30 seconds',
    image: 'https://www.shape.com/thmb/qduTPye3retnjhDaV9u0JtkVHX8=/650x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/low-plank-hold-b8a63da1ef844f00b6f6a21141ba1d87.jpg',
    type: 'excersise_item',
    isDone: false,
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    xp: 60
  },
  {
    Day: 1,
    title: 'Burpees',
    subtitle: '30 seconds',
    image: 'https://experiencelife.lifetime.life/wp-content/uploads/2021/03/How-to-do-the-perfect-burpee.jpg',
    type: 'excersise_item',
    isDone: false,
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    xp: 55
  }
];

const notificationsData = [
  {
    title: 'Today',
    data: [
      {
        title: 'Biginner',
        type: 'invite'
      }
    ]
  },
  {
    title: 'Yesterday',
    data: [
      {
        title: 'New Workout is Available!',
        subtitle: 'Check now and practice',
        type: 'info'
      },
      {
        title: 'New Features are Available',
        subtitle: 'You can now set exercise reminder',
        type: 'info'
      }
    ]
  },
  {
    title: 'May 24, 2022',
    data: [
      {
        title: 'Verification Successful',
        subtitle: 'Account verification completed',
        type: 'info'
      },
      {
        title: 'New Features are Available',
        subtitle: 'You can now set exercise reminder',
        type: 'info'
      }
    ]
  }
];

const suggestionItems = [
  {
    title: 'Benefits of daily Exercise',
    subtitle: 'Benefits of daily exercising',
    body: '\u2022 Reduce your risk of a heart attack\n\u2022 Manage your weight better.\n\u2022 Have a lower blood cholesterol level.\n\u2022 lower the risk of type 2 diabetes and some cancers.'
  },
  {
    title: 'Risks of daily Exercise',
    subtitle: 'Avoid these things while daily Exercising',
    body: '\u2022 Reduce your risk of a heart attack.\n\u2022 Manage your weight better.\n\u2022 Have a lower blood cholesterol level.\n\u2022 lower the risk of type 2 diabetes and some cancers.\n\u2022 Heavy weight lefting\n\u2022 Heavy weight lefting'
  }
];

export default {
  invite,
  challengeParticipants,
  challengeParticipantsResults,
  friends,
  userProfilePic,
  exercises,
  trophyImage,
  exerciseImage,
  flag,
  notificationsData,
  suggestionItems,
  ad,
  splash_image
};
