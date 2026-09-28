// import { Link } from 'react-router-dom';
import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const data = 'some global value'; // sample use for latest React Router feature

  return (
    <>
      {/* <h1>HomeLayout</h1> */}
      {/* <Link to='/about'>about page</Link> */}

      <Navbar />
      <section className='page'>
        {isPageLoading ? <div className='loading'></div> : <Outlet context={data} />}
      </section>
    </>
  );
};
export default HomeLayout;
