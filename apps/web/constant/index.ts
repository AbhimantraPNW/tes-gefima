//NAVIGATION
export const NAV_LINKS = [
    { href: '/', key: 'home', label: 'Home' },
    {
      href: '/',
      key: 'about-us',
      label: 'About Us',
      subNav: [
        { subHref: '/store', subKey: 'store', subLabel: 'Store Location' },
      ],
    },
  ];
  
  //HERO
  export const HERO_BG = [
    { label: 'hero1', image: '/hero3.jpg' },
    { label: 'hero2', image: '/hero2.jpg' },
  
  ];
  
  //TESTIMONIAL
  export const TESTIMONIAL = [
    {
      name: 'Laurent Cantika',
      description:
        'Our kids absolutely love the toys we bought from this shop! The selection is incredible, and the quality is top-notch. We cant recommend this store enough!',
      image: '/People-Img/1.jpg',
    },
    {
      name: 'Willona Ryder',
      description:
        'Shopping here is like stepping into a wonderland. The staff is super friendly and helped us find the perfect gifts. Our children are thrilled with their new toys!',
      image: '/People-Img/2.jpg',
    },
    {
      name: 'Phillip Simons',
      description:
        'We found so many educational toys that make learning fun for our kids. Its great to see them so engaged and excited about playing and learning. This shop is a gem!',
      image: '/People-Img/3.jpg',
    },
    {
      name: 'John Andreas',
      description:
        'Weve tried many toy stores, but this one is by far the best. The variety, the quality, and the customer service are all outstanding. Our go-to place for toys!',
      image: '/People-Img/4.jpg',
    },
  ];
  
  //FOOTER
  export const FOOTER_ABOUT = [
    {
      title: 'About Dita Toys',
      description: 'Your Happiness is Our Happiness Too',
      social: '/instagram.svg',
      // admin: 'Admin Page',
    },
  ];
  
  export const DEVELOPER_TEAM = [
    { title: 'Dita Toys Email', email: 'dttoys@gmail.com' },
  ];
  
  export const PATERA_STORE = [
    {
      title: 'Our Store',
      address: 'Gg. Cikini Cikulak Cikidi Yogyakarta',
      contact: '0123-456-789',
    },
  ];