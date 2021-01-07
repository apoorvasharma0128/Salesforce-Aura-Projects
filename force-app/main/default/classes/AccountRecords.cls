public class Account_Records {
    
    @AuraEnabled
    public static list<Account> getRecords()
    {
        List<Account> accList = [SELECT Id, Name,Owner.name, Phone,Website ,AnnualRevenue FROM Account where
                                Industry=:'Financial Services'];
        return accList;
    }
    
    @AuraEnabled
    public static void updateAccounts(List<Account> accList ){
        database.update(accList);
    }

}