import PropTypes from "prop-types";
import { i18n, Link, withTranslation } from "../i18n";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "antd";

const Homepage = ({ t }) => (
  <>
    <main>
      <Header title={t("h1")} />
      <div>
        <Button
          type="primary"
          onClick={() =>
            i18n.changeLanguage(i18n.language === "en" ? "de" : "en")
          }
        >
          {t("change-locale")}
        </Button>
        <Link href="/second-page">
          <Button>{t("to-second-page")}</Button>
        </Link>
      </div>
    </main>
    <Footer />
  </>
);

Homepage.getInitialProps = async () => ({
  namespacesRequired: ["common", "footer"],
});

Homepage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(Homepage);
