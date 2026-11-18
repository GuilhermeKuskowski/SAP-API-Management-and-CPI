sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"purchaseorders/test/integration/pages/OrdersList.gen",
	"purchaseorders/test/integration/pages/OrdersObjectPage.gen"
], function (JourneyRunner, OrdersListGenerated, OrdersObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('purchaseorders') + '/test/flpSandbox.html#purchaseorders-tile',
        pages: {
			onTheOrdersListGenerated: OrdersListGenerated,
			onTheOrdersObjectPageGenerated: OrdersObjectPageGenerated
        },
        async: true
    });

    return runner;
});

