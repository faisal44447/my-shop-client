import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import Contact from '../Contact/Contact';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
        <Helmet>
            <title>Home | laivin Jewellers</title>
        </Helmet>
            <Banner></Banner>
            <Category></Category>
            <Contact></Contact>
        </div>
    );
};

export default Home;