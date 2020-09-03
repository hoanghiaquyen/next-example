import Link from "next/link";
import faker from "faker";

const Index = ({ name }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome, {name}</p>

      <div>
        <Link href="/about">
          <a>About Page</a>
        </Link>
      </div>
    </div>
  );
};

export default Index;

export async function getStaticProps() {
  const name = faker.name.findName();

  return {
    props: { name },
  };
}
