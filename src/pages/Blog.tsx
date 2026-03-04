import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const posts = [
  {
    slug: "life-skills-training-changing-youth-outcomes",
    image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Programs",
    date: "Jan 15, 2025",
    title: "How Life Skills Training Is Changing Youth Outcomes in Nairobi",
    excerpt: "Our latest cohort of youth participants share their transformative experiences after completing the life skills training program.",
  },
  {
    slug: "parent-workshop-building-stronger-families",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Community",
    date: "Dec 20, 2024",
    title: "Parent Workshop Series: Building Stronger Families Together",
    excerpt: "Candid Hope's caregiver workshops bring parents together to learn positive parenting techniques and support strategies.",
  },
  {
    slug: "year-in-review-reaching-1689-community-members",
    image: "https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Impact",
    date: "Nov 8, 2024",
    title: "Year in Review: Reaching 1,689 Community Members",
    excerpt: "A look back at the milestones, programs, and lives touched by Candid Hope throughout the year.",
  },
  {
    slug: "digital-literacy-preparing-youth",
    image: "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Education",
    date: "Oct 3, 2024",
    title: "Digital Literacy: Preparing Youth for Tomorrow's Job Market",
    excerpt: "Our new digital literacy program equips young people with computer skills essential for modern employment opportunities.",
  },
  {
    slug: "breaking-stigma-mental-health-schools",
    image: "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Health",
    date: "Sep 12, 2024",
    title: "Breaking the Stigma: Mental Health Conversations in Schools",
    excerpt: "Candid Hope partners with local schools to create safe spaces for mental health discussions among students.",
  },
  {
    slug: "meet-our-volunteers-stories-of-dedication",
    image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Volunteers",
    date: "Aug 5, 2024",
    title: "Meet Our Volunteers: Stories of Dedication and Impact",
    excerpt: "Hear from the dedicated volunteers who give their time and energy to make Candid Hope's programs possible.",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main>
        <PageHero
          title="Our Blog"
          subtitle="Stories, updates, and insights from our work in Nairobi."
          backgroundImage="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260"
        />

        <section className="py-24 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <Link
                  key={post.title}
                  to={`/blog/${post.slug}`}
                  className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group block"
                >
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground text-xs mb-2">{post.date}</p>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
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

export default Blog;
