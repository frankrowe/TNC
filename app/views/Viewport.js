/*
    Main Viewport panel array:
    -------------------
    0: Home Panel
    1: Trail List
    2: Main Trail Panel
    3: Safety & Rules
    4: Near Me
    5; Reach Out
*/


app.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    items: [
      app.homePanel,
      app.trailListPanel,
      app.trailPanel,
      app.rulesPanel,
      app.nearMePanel,
      app.reachOutPanel
    ]
});