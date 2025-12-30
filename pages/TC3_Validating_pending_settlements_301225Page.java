package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

// ============================================
// LOGIN PAGE
// ============================================
class LoginPage {
    private Page page;
    
    // Locators - INFERIDOS (no URL disponible)
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator userProfileIndicator;
    
    public LoginPage(Page page) {
        this.page = page;
        this.usernameInput = page.locator("[data-testid='username-input']");
        this.passwordInput = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
        this.userProfileIndicator = page.locator("[data-testid='user-profile-indicator']");
    }
    
    public void navigateToLoginPage() {
        page.navigate(System.getenv("ACTICENTER_BASE_URL"));
    }
    
    public void enterUsername(String username) {
        usernameInput.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        usernameInput.fill(username);
    }
    
    public void enterPassword(String password) {
        passwordInput.fill(password);
    }
    
    public void clickLoginButton() {
        loginButton.click();
    }
    
    public boolean isLoggedIn() {
        userProfileIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
        return userProfileIndicator.isVisible();
    }
}

// ============================================
// CONTRACT PAGE
// ============================================
class ContractPage {
    private Page page;
    
    // Locators - INFERIDOS (no URL disponible)
    private Locator contractSelector;
    private Locator contractValueComponent;
    private Locator searchButton;
    private Locator headerComponent;
    
    // Contract type options
    private Locator casaDeBolsaOption;
    private Locator bankContractOption;
    private Locator noPendingSettlementsOption;
    
    public ContractPage(Page page) {
        this.page = page;
        this.contractSelector = page.locator("[data-testid='contract-selector']");
        this.contractValueComponent = page.locator("[data-testid='contract-value-component']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.headerComponent = page.locator("[data-testid='header-component']");
        this.casaDeBolsaOption = page.locator("[data-testid='contract-option-casa-bolsa']");
        this.bankContractOption = page.locator("[data-testid='contract-option-bank']");
        this.noPendingSettlementsOption = page.locator("[data-testid='contract-option-no-pending']");
    }
    
    public void openContractSelector() {
        contractSelector.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        contractSelector.click();
    }
    
    public void selectCasaDeBolsaContract() {
        casaDeBolsaOption.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        casaDeBolsaOption.click();
        page.waitForLoadState();
    }
    
    public void selectBankContract() {
        bankContractOption.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        bankContractOption.click();
        page.waitForLoadState();
    }
    
    public void selectContractWithNoPendingSettlements() {
        noPendingSettlementsOption.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        noPendingSettlementsOption.click();
        page.waitForLoadState();
    }
    
    public boolean isValueComponentVisible() {
        contractValueComponent.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(5000));
        return contractValueComponent.isVisible();
    }
    
    public void clickValueComponent() {
        contractValueComponent.click();
    }
    
    public void clickSearchButton() {
        searchButton.click();
    }
    
    public String getContractValue() {
        return contractValueComponent.textContent();
    }
}

// ============================================
// BREAKDOWN PAGE
// ============================================
class BreakdownPage {
    private Page page;
    
    // Locators - INFERIDOS (no URL disponible)
    private Locator breakdownPopup;
    private Locator closeBreakdownButton;
    private Locator pendingSettlementsField;
    private Locator pendingSettlementsValue;
    private Locator breakdownItemsList;
    private Locator tooltipInfo;
    
    // Breakdown item fields
    private Locator fondosField;
    private Locator efectivoField;
    private Locator monetaryValueFields;
    
    public BreakdownPage(Page page) {
        this.page = page;
        this.breakdownPopup = page.locator("[data-testid='breakdown-popup']");
        this.closeBreakdownButton = page.locator("[data-testid='close-breakdown-button']");
        this.pendingSettlementsField = page.locator("[data-testid='pending-settlements-field']");
        this.pendingSettlementsValue = page.locator("[data-testid='pending-settlements-value']");
        this.breakdownItemsList = page.locator("[data-testid='breakdown-items-list']");
        this.tooltipInfo = page.locator("[data-testid='tooltip-info']");
        this.fondosField = page.locator("[data-testid='fondos-field']");
        this.efectivoField = page.locator("[data-testid='efectivo-field']");
        this.monetaryValueFields = page.locator("[data-testid='monetary-value-field']");
    }
    
    public boolean isBreakdownPopupVisible() {
        breakdownPopup.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(5000));
        return breakdownPopup.isVisible();
    }
    
    public boolean areAllItemsDisplayed() {
        return breakdownItemsList.isVisible() && breakdownItemsList.locator("> *").count() > 0;
    }
    
    public boolean isPendingSettlementsFieldVisible() {
        return pendingSettlementsField.isVisible();
    }
    
    public String getPendingSettlementsValue() {
        pendingSettlementsValue.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return pendingSettlementsValue.textContent().trim();
    }
    
    public boolean isValidMonetaryValue(String value) {
        // Validates format like $1,234.56 or $0.00
        return value != null && value.matches("^\\$[\\d,]+\\.\\d{2}$");
    }
    
    public boolean isZeroValue(String value) {
        // Checks if value is $0.00 or similar zero representation
        return value != null && (value.equals("$0.00") || value.equals("$0") || value.matches("^\\$0+\\.?0*$"));
    }
    
    public boolean isFormatConsistent(String value1, String value2) {
        // Both values should follow the same monetary format pattern
        boolean bothValid = isValidMonetaryValue(value1) && isValidMonetaryValue(value2);
        return bothValid;
    }
    
    public void closeBreakdownPopup() {
        closeBreakdownButton.click();
        breakdownPopup.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN).setTimeout(3000));
    }
    
    public String getFondosValue() {
        return fondosField.textContent().trim();
    }
    
    public String getEfectivoValue() {
        return efectivoField.textContent().trim();
    }
    
    public void hoverTooltip() {
        tooltipInfo.hover();
    }
    
    public boolean isTooltipVisible() {
        return tooltipInfo.isVisible();
    }
}