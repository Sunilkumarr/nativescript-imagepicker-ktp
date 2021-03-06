"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application = require("tns-core-modules/application");
var platform = require("tns-core-modules/platform");
var ui_frame = require("tns-core-modules/ui/frame");
var page_1 = require("tns-core-modules/ui/page");
var action_bar_1 = require("tns-core-modules/ui/action-bar");
var listview_1 = require("nativescript-pro-ui/listview");
var page;
var list;
var album;
function pageLoaded(args) {
    page = args.object;
    page.bindingContext = page.navigationContext;
    list = page.getViewById("images-list");
    list.listViewLayout.spanCount = Math.floor(platform.screen.mainScreen.widthDIPs / 80);
    application.on("orientationChanged", function (e) {
        var currentPageWidth = platform.screen.mainScreen.heightDIPs;
        list.listViewLayout.spanCount = Math.floor(currentPageWidth / 80);
    });
}
exports.pageLoaded = pageLoaded;
function done(args) {
    var topmost = ui_frame.topmost();
    topmost.goBack();
    topmost.goBack();
    page.bindingContext.imagePicker.done();
}
exports.done = done;
function imagesPageFactory() {
    var page = new page_1.Page();
    page.on(page_1.Page.loadedEvent, pageLoaded);
    var actionBar = new action_bar_1.ActionBar();
    actionBar.bind({ targetProperty: "title", sourceProperty: "title", twoWay: false });
    var navigationButton = new action_bar_1.NavigationButton();
    navigationButton.text = "Albums";
    actionBar.navigationButton = navigationButton;
    var actionItems = new action_bar_1.ActionItems();
    var item = new action_bar_1.ActionItem();
    item.bind({
        targetProperty: "text", sourceProperty: "imagePicker.selection.length", twoWay: false,
        expression: "imagePicker.doneText + (imagePicker.mode === 'single' ? '' : ' (' + imagePicker.selection.length + ')')"
    });
    item.ios.position = "right";
    item.on("tap", done);
    actionBar.actionItems.addItem(item);
    page.actionBar = actionBar;
    var listView = new listview_1.RadListView();
    listView.id = "images-list";
    listView.bind({ targetProperty: "items", sourceProperty: "assets", twoWay: false });
    var listViewGridLayout = new listview_1.ListViewGridLayout();
    listViewGridLayout.scrollDirection = "Vertical";
    listViewGridLayout.spanCount = 4;
    listViewGridLayout.itemHeight = 80;
    listView.listViewLayout = listViewGridLayout;
    listView.itemTemplate =
        "<GridLayout margin=\"1\" rows=\"auto\" tap=\"{{ toggleSelection }}\"> \
        <Image height=\"78\" width=\"78\" opacity=\"{{ selected ? 0.7 : 1 }}\" src=\"{{ $value }}\"/> \
        </GridLayout>";
    page.content = listView;
    return page;
}
exports.imagesPageFactory = imagesPageFactory;
//# sourceMappingURL=images.ios.js.map