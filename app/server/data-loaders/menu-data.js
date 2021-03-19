import _ from "lodash";

exports.getNavigationMenuArray = function(menuList, sectionList) {
  _(menuList).forEach(menuItem => {
    menuItem.children = _(menuList)
      .filter(item => item["parent-id"] === menuItem.id)
      .value();
    switch (menuItem["item-type"]) {
      case "tag":
        menuItem.completeUrl = menuItem["tag-slug"] ? `/topic/${menuItem["tag-slug"]}` : "/#";
        break;
      case "link":
        menuItem.completeUrl = _.get(menuItem, ["data", "link"]) || "/#";
        menuItem.isExternalLink = true;
        break;
      case "section":
        menuItem.completeUrl = findCompleteUrl(menuItem, sectionList);
        break;
      default:
        menuItem.completeUrl = "/#";
        break;
    }
  });
  const menu = _(menuList)
    .filter(item => item["parent-id"] == null)
    .value();
  return {
    footer: menu.filter(item => item["menu-group-slug"] === "footer"),
    default: menu.filter(item => item["menu-group-slug"] === "default"),
    homeMenu: menu.filter(item => item["menu-group-slug"] === "home"),
    hamburgerMenu: menu.filter(item => item["menu-group-slug"] === "hamburger")
  };
};

function findCompleteUrl(menuItem, sectionList) {
  const sectionObject = _.find(sectionList, function(item) {
    return item.id === menuItem["item-id"];
  });
  if (!sectionObject) {
    return "/#";
  }
  if (sectionObject["parent-id"]) {
    const parentSectionObj = _.find(sectionList, function(item) {
      return sectionObject["parent-id"] === item.id;
    });
    return parentSectionObj ? `/${parentSectionObj.slug}/${sectionObject.slug}` : "/#";
  }
  return "/" + sectionObject.slug || "/#";
}
