import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { useStore } from "../lib/redux";
import { useApollo } from "../lib/apollo";

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}
