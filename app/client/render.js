import { renderIsomorphicComponent, renderComponent, renderBreakingNews } from "@quintype/framework/client/start";
import get from "lodash/get";

import { pickComponent } from "../isomorphic/pick-component";
import { BreakingNewsView } from "../isomorphic/components/breaking-news-view";
import { NavbarSearch } from "../isomorphic/components/layouts/header/navbar-search";
import { NavBar } from "../isomorphic/components/layouts/header/nav-bar";
import { Footer } from "../isomorphic/components/layouts/footer";
import { AppLogo } from "../isomorphic/components/layouts/app-logo";

export function preRenderApplication(store) {
  const hydrate = { hydrate: !global.qtLoadedFromShell };
  const breakingNewsConfig = get(store.getState(), ["qt", "config", "publisher-attributes", "breaking_news"], {});
  const breakingNewsInterval =
    breakingNewsConfig.interval && breakingNewsConfig.interval <= 60 ? 60 : breakingNewsConfig.interval;
  const breakingNewsbaseProps = {
    hydrate,
    updateInterval: breakingNewsInterval * 1000
  };

  global.qtLoadedFromShell && renderComponent(Footer, "footer", store, hydrate);
  renderComponent(AppLogo, "app-logo", store);
  renderComponent(AppLogo, "app-logo-footer", store);
  renderComponent(NavbarSearch, "search-bar", store, hydrate);
  renderComponent(NavBar, "nav-bar", store, hydrate);
  breakingNewsConfig.is_enable &&
    renderBreakingNews("breaking-news-container", store, BreakingNewsView, breakingNewsbaseProps);
}

// This is a separate file as everything from here on is hot reloaded when the app changes
export function renderApplication(store) {
  renderIsomorphicComponent("container", store, pickComponent, {
    hydrate: !global.qtLoadedFromShell
  });
}
