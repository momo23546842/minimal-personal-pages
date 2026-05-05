export type JourneyEntry = {
  id: string
  date: string
  title: string
  description: string
  fullDescription: string
  image: string           // fallback if thumbnailImage/detailImage not set
  thumbnailImage?: string // image shown on the card
  detailImage?: string    // image shown in the modal
  thumbnailPosition?: string // css object-position for card crop (e.g. 'center 60%')
  tags?: string[]
}

export const journeyEntries: JourneyEntry[] = [
  {
    id: 'coastal-walk',
    date: '5 May, 2026',
    title: 'Coastal Walk from Rose Bay to Watsons Bay',
    description: 'A calm and refreshing coastal walk with beautiful scenery.',
    fullDescription: `I did a coastal walk from Rose Bay to Watsons Bay. It was about 7.5 km, and I took my time, stopping to take photos and rest at beaches along the way. The weather was nice and the temperature was comfortable, so it was a very pleasant walk. Next time, I'd like to try other places as well.`,
    image: '/images/Journey/rosebaytowatosnsbay2.jpg',
    thumbnailImage: '/images/Journey/rosebaytowatsonsbay.jpg',
    detailImage: '/images/Journey/rosebaytowatosnsbay2.jpg',
    tags: ['australia', 'beach', 'sunset']
  },
  {
    id: 'travel-to-cairns',
    date: 'April, 2026',
    title: 'Travel to Cairns',
    description: 'A trip to Cairns where I enjoyed nature through beaches, rainforest, and various activities',
    fullDescription: 'I traveled to Cairns, where I enjoyed a variety of activities and beautiful scenery, making the most of nature. I visited Port Douglas and saw stunning beaches, and explored the tropical rainforest in Kuranda. One of the most memorable experiences was snorkeling at Green Island, where I was able to see a sea turtle, something I had always hoped for. It became another wonderful memory during my time living in Australia.',
    image: '/images/Journey/seaturtle.jpg',
    thumbnailImage: '/images/Journey/cairns.jpg',
    detailImage: '/images/Journey/seaturtle.jpg',
    tags: ['Australia', 'Travel', 'Cairns']
  },
  {
    id: 'bought-flowers',
    date: 'November, 2025',
    title: 'Bought flowers at the flower market',
    description: 'A day I bought beautiful flowers for myself at the flower market',
    fullDescription: `On my day off, I woke up early and visited the Sydney Flower Market. There were so many beautiful flowers and plants, and just being there made me feel really happy. I chose these flowers for myself, and having them in my room brightens my mood every day. I’m really happy I bought them.`,
    image: '/images/Journey/flowermarket2jpg.jpg',
    thumbnailImage: '/images/Journey/flowermarket.jpg',
    thumbnailPosition: 'center 70%',
    detailImage: '/images/Journey/flowermarket2jpg.jpg',
    tags: ['flowers', 'market', 'Sydney']
  },
  {
    id: 'lantern-festival',
    date: 'March 9, 2025',
    title: 'WaterLantern Festival',
    description: 'Surrounded by glowing lanterns and festive energy under the night sky.',
    fullDescription: 'I went to the Water Lantern Festival held in Sydney. In the evening, I decorated my lantern by drawing pictures and writing messages, and after it got dark, I floated it on the water. The lanterns created by everyone lit up the waterfront, making the atmosphere magical and beautiful.',
    image: '/images/Australia/LanternFestival-sydney.jpg',
    thumbnailImage: '/images/Journey/lantern.jpg',
    detailImage: '/images/Australia/LanternFestival-sydney.jpg',
    tags: ['festival', 'night', 'art']
  }
]
