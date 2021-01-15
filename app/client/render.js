import { renderIsomorphicComponent, renderComponent, renderBreakingNews } from "@quintype/framework/client/start";
import { pickComponent } from "../isomorphic/pick-component";
import { BreakingNewsView } from "../isomorphic/components/breaking-news-view";
import { Header } from "../isomorphic/components/header";
import { Footer } from "../isomorphic/components/layouts/footer";
import get from "lodash/get";

export function preRenderApplication(store) {
  const hydrate = { hydrate: !global.qtLoadedFromShell };
  const pageType = get(store.getState(), ["qt", "pageType"], null);
  const breakingNewsConfig = get(store.getState(), ["qt", "config", "publisher-attributes", "breaking_news"], {});
  const shouldBreakingNewsRender = breakingNewsConfig.is_enable && breakingNewsConfig.pages.includes(pageType);
  const interval = breakingNewsConfig.interval && breakingNewsConfig.interval <= 60 ? 60 : breakingNewsConfig.interval;
  const breakingNewsbaseProps = {
    hydrate,
    updateInterval: interval * 1000,
    breakingNewsConfig
  };

  renderComponent(Header, "header", store, hydrate);
  shouldBreakingNewsRender &&
    renderBreakingNews("breaking-news-container", store, BreakingNewsView, breakingNewsbaseProps);
  renderComponent(Footer, "footer", store, hydrate);
}

// This is a separate file as everything from here on is hot reloaded when the app changes
export function renderApplication(store) {
  renderIsomorphicComponent("container", store, pickComponent, {
    hydrate: !global.qtLoadedFromShell
  });
}
