import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";

const allPosts = [
  {
    slug: "life-skills-training-changing-youth-outcomes",
    image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1260",
    category: "Programs",
    date: "Jan 15, 2025",
    author: "David Kamau",
    title: "How Life Skills Training Is Changing Youth Outcomes in Nairobi",
    excerpt: "Our latest cohort of youth participants share their transformative experiences after completing the life skills training program.",
    content: `The impact of life skills training on young people in Nairobi cannot be overstated. Over the past year, Candid Hope has trained more than 200 youth in essential life skills including decision-making, financial literacy, and interpersonal communication.\n\nParticipants report increased confidence, better academic performance, and stronger relationships with peers and family members. "Before the program, I didn't know how to handle conflict," says Mary, a 17-year-old from Eastlands. "Now I can communicate my feelings and find solutions."\n\nThe program uses a peer-to-peer mentorship model where older participants guide newcomers, creating a sustainable cycle of empowerment. Our trained facilitators lead weekly sessions that combine interactive activities, group discussions, and real-world scenario practice.\n\nLooking ahead, we plan to expand the program to 10 more schools across Nairobi County in 2025, reaching an estimated 500 additional youth. With continued support from our donors and volunteers, we believe every young person in Nairobi can access these life-changing skills.`,
  },
  {
    slug: "parent-workshop-building-stronger-families",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260",
    category: "Community",
    date: "Dec 20, 2024",
    author: "Sarah Njeri",
    title: "Parent Workshop Series: Building Stronger Families Together",
    excerpt: "Candid Hope's caregiver workshops bring parents together to learn positive parenting techniques and support strategies.",
    content: `Strong families are the foundation of strong communities. That's why Candid Hope launched its Parent & Caregiver Workshop Series in 2024, bringing together parents from across Nairobi to learn evidence-based parenting techniques.\n\nThe workshops cover topics including positive discipline, active listening, understanding adolescent development, and creating supportive home environments. Each session includes practical exercises that parents can immediately apply at home.\n\n"I used to think discipline meant punishment," shares James, a father of three. "These workshops taught me that connection and communication are far more effective. My relationship with my teenagers has completely transformed."\n\nTo date, over 150 parents and caregivers have participated in the series, with 95% reporting improved family relationships. We've also seen a significant reduction in school behavioral issues among children whose parents attended the workshops.`,
  },
  {
    slug: "year-in-review-reaching-1689-community-members",
    image: "https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=1260",
    category: "Impact",
    date: "Nov 8, 2024",
    author: "Peter Omondi",
    title: "Year in Review: Reaching 1,689 Community Members",
    excerpt: "A look back at the milestones, programs, and lives touched by Candid Hope throughout the year.",
    content: `As we reflect on another year of impact, we're proud to share that Candid Hope has now reached over 1,689 community members across Nairobi. This milestone represents countless hours of mentorship, workshops, and community engagement.\n\nKey achievements include expanding our school partnerships to 5 institutions, launching the digital literacy program, hosting 50+ workshops, and training 200+ youth in life skills. Our community events attracted over 500 attendees throughout the year.\n\nWe also strengthened our volunteer base with 150+ active volunteers contributing their time and expertise. None of this would have been possible without the generous support of our donors and the dedication of our team.\n\nAs we look to 2025, our goals include doubling our reach, launching new mental health programs, and establishing a permanent community center in Nairobi. Thank you for being part of this journey of hope and transformation.`,
  },
  {
    slug: "digital-literacy-preparing-youth",
    image: "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1260",
    category: "Education",
    date: "Oct 3, 2024",
    author: "Faith Wambui",
    title: "Digital Literacy: Preparing Youth for Tomorrow's Job Market",
    excerpt: "Our new digital literacy program equips young people with computer skills essential for modern employment opportunities.",
    content: `In today's digital world, computer literacy is no longer optional — it's essential. Candid Hope's Digital Literacy Program was launched to bridge the digital divide for youth in underserved Nairobi communities.\n\nThe program teaches basic computer skills, internet safety, digital communication, and introductory coding concepts. Students learn using donated laptops and tablets, with sessions held in community centers and school computer labs.\n\n"I had never used a computer before joining this program," says Kevin, 16. "Now I can create documents, send emails, and I'm even learning to build simple websites. It's opened my eyes to career possibilities I never imagined."\n\nSo far, 80 youth have completed the program, with several going on to pursue further training in IT and computer science. We're seeking funding to expand the program and provide more devices for participants.`,
  },
  {
    slug: "breaking-stigma-mental-health-schools",
    image: "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260",
    category: "Health",
    date: "Sep 12, 2024",
    author: "David Kamau",
    title: "Breaking the Stigma: Mental Health Conversations in Schools",
    excerpt: "Candid Hope partners with local schools to create safe spaces for mental health discussions among students.",
    content: `Mental health remains one of the most stigmatized topics in many Kenyan communities. Candid Hope is working to change this narrative by bringing open, supportive mental health conversations into schools across Nairobi.\n\nOur trained counselors and peer mentors facilitate weekly sessions where students can discuss stress, anxiety, depression, and other mental health challenges in a safe, non-judgmental environment.\n\nThe program also trains teachers to recognize signs of mental health struggles and provides resources for students who need additional support. We've partnered with licensed counselors who offer free sessions to students identified as needing professional help.\n\nSince launching, we've reached students across 5 schools, with feedback showing increased awareness and reduced stigma around mental health. Students report feeling more comfortable seeking help and supporting peers who are struggling.`,
  },
  {
    slug: "meet-our-volunteers-stories-of-dedication",
    image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260",
    category: "Volunteers",
    date: "Aug 5, 2024",
    author: "Sarah Njeri",
    title: "Meet Our Volunteers: Stories of Dedication and Impact",
    excerpt: "Hear from the dedicated volunteers who give their time and energy to make Candid Hope's programs possible.",
    content: `Behind every successful program at Candid Hope are the dedicated volunteers who make it all possible. This month, we spotlight three volunteers who embody the spirit of service and community.\n\nGrace Wanjiku, a university student, has been mentoring youth since 2022. "These young people teach me as much as I teach them," she says. "Seeing them grow in confidence is the greatest reward."\n\nSamuel Kiprotich, a retired teacher, facilitates workshops on leadership and communication. His decades of experience bring a unique perspective to the program.\n\nLucy Adhiambo, an event coordinator, ensures our community events run smoothly and create lasting memories. "Every event is a chance to bring the community together and show people what's possible when we work as one."\n\nWe're always looking for passionate individuals to join our volunteer team. If you'd like to make a difference, visit our volunteer page to learn more.`,
  },
];

const BlogDetails = () => {
  const { slug } = useParams();
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Navbar />
        <main className="py-32 text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-secondary hover:underline">← Back to Blog</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main>
        <PageHero
          title={post.title}
          subtitle={post.excerpt}
          backgroundImage={post.image}
        />

        <section className="py-20 bg-background">
          <div className="container max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-secondary" /> {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-secondary" /> {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-secondary" /> {post.category}
                </span>
              </div>

              <img
                src={post.image}
                alt={post.title}
                className="w-full aspect-video object-cover rounded-2xl mb-10 shadow-lg"
              />

              <div className="prose prose-lg max-w-none">
                {post.content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-foreground/85 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>

              <Link
                to="/blog"
                className="inline-flex items-center gap-2 mt-10 text-secondary hover:text-orange-glow font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to all posts
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-20 bg-section-warm">
          <div className="container">
            <h2 className="text-3xl font-display font-bold text-foreground mb-10 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  to={`/blog/${rp.slug}`}
                  className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
                >
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      {rp.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground text-xs mb-2">{rp.date}</p>
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-secondary transition-colors">
                      {rp.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetails;
