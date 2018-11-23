import { renderIsomorphicComponent, renderComponent, renderBreakingNews } from "@quintype/framework/client/start";
import { pickComponent } from "../isomorphic/pick-component";
import { BreakingNewsView } from "../isomorphic/components/breaking-news-view";
import { Header } from "../isomorphic/components/header";
import { Footer } from "../isomorphic/components/layouts/footer";

// This is a separate file as everything from here on is hot reloaded when the app changes
export function renderApplication(store) {
  renderComponent(Header, "header", store);
  renderIsomorphicComponent("container", store, pickComponent, {
    hydrate: !global.qtLoadedFromShell
  });
  renderBreakingNews("breaking-news-container", store, BreakingNewsView);
  renderComponent(Footer, "footer", store);
}
