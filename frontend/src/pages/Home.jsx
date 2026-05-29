import { Link } from "react-router-dom";

const Home = () => (
  <section className="hero">
    <h1>SkillSphere</h1>
    <h2>Intelligent Hyperlocal Freelance Ecosystem</h2>
    <p>Connect nearby clients and freelancers with AI skill matching, proposals, secure milestone payments, collaboration, reviews and admin monitoring.</p>
    <div className="row center">
      <Link to="/register" className="btn">Start Now</Link>
      <Link to="/login" className="btn secondary">Login</Link>
    </div>
  </section>
);

export default Home;
