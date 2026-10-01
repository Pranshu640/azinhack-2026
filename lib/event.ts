// Organizer-confirmed facts. Replace null only when the official application URL is supplied.
export const event = {
  name: "AZINHACK ’26",
  dates: '21–22 October 2026',
  registrationUrl: null as string | null,
  venue: 'GGSIPU USAR · East Delhi Campus',
  address: 'Surajmal Vihar, Delhi — 110092',
  prizePool: '₹1,00,000',
};

// Add new local photos here; the gallery and viewer expand automatically.
export const gallery = [
  { src: '/gallery/community-01.webp', alt: 'A large group cheering together on an auditorium stage.', caption: 'Good people. Great energy.' },
  { src: '/gallery/community-02.webp', alt: 'A group in black IoSC shirts behind the registration desk and yellow AZINHACK letters.', caption: 'Where it all begins.' },
  { src: '/gallery/community-03.webp', alt: 'A medal being presented on stage while others look on.', caption: 'A moment worth building for.' },
  { src: '/gallery/community-04.webp', alt: 'Medal recipients holding certificates in a group portrait on stage.', caption: 'Made of shared moments.' },
  { src: '/gallery/community-05.webp', alt: 'A large group seated and standing together on an auditorium stage.', caption: 'The community behind it all.' },
];

export const inspirations = [
  { name: 'Everyday life', code: '01', title: 'Small friction.\nBig possibility.', text: 'Find a problem hiding in plain sight. Make everyday tasks, information, or opportunities easier to access.', idea: 'Think: a live scholarship finder or a student opportunity board.' },
  { name: 'A better planet', code: '02', title: 'Build for\na better tomorrow.', text: 'Explore repair, resources, waste, or sustainability. Turn useful information into something people can act on.', idea: 'Think: a repair-first assistant or a recycling resource finder.' },
  { name: 'Smarter systems', code: '03', title: 'Less messy.\nMore useful.', text: 'Connect fragmented information and simplify a process. Help people research, compare, or navigate with confidence.', idea: 'Think: a source-backed research assistant or a public-service navigator.' },
  { name: 'Your wild card', code: '04', title: 'The idea only\nyou would have.', text: 'Bring a fresh perspective to an overlooked problem. Choose the people you want to help and build for them.', idea: 'Your domain. Your problem. Your original approach.' },
];

export const journey = [
  { phase: '01 / BEGIN', title: 'Meet. Think. Sketch.', text: 'Arrive, connect with the community, and turn a problem into a plan.', tags: 'CHECK IN / KICK OFF' },
  { phase: '02 / MAKE', title: 'Build through the night.', text: 'Make a prototype, test your assumptions, and give your idea a connection to the live web.', tags: 'BUILD / ITERATE' },
  { phase: '03 / SHOW', title: 'Make your idea heard.', text: 'Demo the solution, show TinyFish in action, and celebrate what you made.', tags: 'DEMO / CELEBRATE' },
];

export const faqs = [
  { q: 'When and where is AZINHACK?', a: '21–22 October 2026 at GGSIPU USAR, East Delhi Campus, Surajmal Vihar, Delhi. Final reporting times and room details will be announced by the organizers.' },
  { q: 'What can we build?', a: 'AZINHACK has one Open Innovation track. Choose a problem you care about and build a useful prototype. Final competition rules will be published by the organizers.' },
  { q: 'Is TinyFish integration required?', a: 'Yes. Every project must integrate TinyFish. Make its role clear in your project and demonstration. The quick-start resources on this page can help you prepare.' },
  { q: 'How do I register?', a: 'The official registration link will be announced soon. You can save the event dates to your calendar while the application details are being finalized.' },
  { q: 'What is the team size?', a: 'Team size, eligibility, and participation requirements will be announced with the official registration details.' },
  { q: 'How will the prizes be distributed?', a: 'The total prize pool is ₹1,00,000. The final prize allocation and judging criteria will be announced by the organizers.' },
];
