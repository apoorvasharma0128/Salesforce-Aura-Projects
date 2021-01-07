({
	getAccounts : function(component, event, helper) {
        component.set('v.columnsList', [
            {label: 'Id', fieldName: 'Id', type: 'text' , editable: false,hidden:true},
            {label: 'Account Name', fieldName: 'linkName', type: 'url', 
            typeAttributes: {label: { fieldName: 'Name'}, target: '_blank'},sortable: true},
            //{label: 'Account Name', fieldName: 'Name', type: 'text', sortable: true, editable : 'true'},-->
            {label: 'Account Owner', fieldName: 'Owner', sortable: true},
            {label: 'Phone', fieldName: 'Phone', editable : 'true'},
            {label: 'Website', fieldName: 'Website', editable : 'true'},
            {label: 'Annual Revenue', fieldName: 'AnnualRevenue', editable : 'true'}
        ]);
        var action = component.get("c.getRecords");
        action.setParams({
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var records =response.getReturnValue();
                console.log('draftValues-> ' + JSON.stringify(records));
                records.forEach(function(record){
                    if(record.Owner) {
                        record.Owner = record.Owner.Name;
                    } 
                    record.linkName = '/'+record.Id;
                });
                
                component.set("v.AccountsList", records);
                helper.sortData(component, component.get("v.sortedBy"), component.get("v.sortedDirection"));
            }
        });
        $A.enqueueAction(action);
		
	},
    
    sortReults: function (component, event, helper) {
        var fields = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        component.set("v.sortedBy", fields);
        component.set("v.sortedDirection", sortDirection);
        helper.sortData(component, fields, sortDirection);
    },
    
    saveRecords: function (component, event, helper) {
        var draftValues = event.getParam('draftValues');
        console.log('draftValues-> ' + JSON.stringify(draftValues));
        var action = component.get("c.updateAccounts");
        
        action.setParams({"accList" : draftValues});
        action.setCallback(this, function(response) {
            var state = response.getState();
            $A.get('e.force:refreshView').fire();
            
        });
        $A.enqueueAction(action);
    }
})