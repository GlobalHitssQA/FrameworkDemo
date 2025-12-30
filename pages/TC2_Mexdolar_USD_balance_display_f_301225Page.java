package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class LoginPage {
    private Page page;
    
    // Locators - INFERIDOS (no se proporcionó URL válida)
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator loginSuccessIndicator;

    public LoginPage(Page page) {
        this.page = page;
        this.usernameInput = page.locator("[data-testid='username-input']");
        this.passwordInput = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
        this.loginSuccessIndicator = page.locator("[data-testid='dashboard-header']");
    }

    public void navigateToLoginPage() {
        page.navigate(System.getenv("ACTICENTER_BASE_URL"));
    }

    public void enterUsername(String username) {
        usernameInput.fill(username);
    }

    public void enterPassword(String password) {
        passwordInput.fill(password);
    }

    public void clickLoginButton() {
        loginButton.click();
    }

    public void waitForLoginSuccess() {
        loginSuccessIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }
}

// ============================================================

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ContractSearchPage {
    private Page page;
    
    // Locators - INFERIDOS (no se proporcionó URL válida)
    private Locator searchButton;
    private Locator searchInput;
    private Locator contractResultsList;
    private Locator firstContractResult;
    private Locator contractMainView;
    private Locator contractSelector;

    public ContractSearchPage(Page page) {
        this.page = page;
        this.searchButton = page.locator("[data-testid='search-button']");
        this.searchInput = page.locator("[data-testid='contract-search-input']");
        this.contractResultsList = page.locator("[data-testid='contract-results-list']");
        this.firstContractResult = page.locator("[data-testid='contract-result-item']:first-child");
        this.contractMainView = page.locator("[data-testid='contract-main-view']");
        this.contractSelector = page.locator("[data-testid='contract-selector']");
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void enterContractSearchCriteria(String criteria) {
        searchInput.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        searchInput.fill(criteria);
        searchInput.press("Enter");
    }

    public void selectContractFromResults() {
        contractResultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        firstContractResult.click();
    }

    public boolean isContractDisplayedInMainView() {
        return contractMainView.isVisible();
    }

    public void selectContract(String contractId) {
        contractSelector.click();
        page.locator("[data-testid='contract-option-" + contractId + "']").click();
    }
}

// ============================================================

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;
import java.util.regex.Pattern;

public class ContractBreakdownPage {
    private Page page;
    
    // Locators - INFERIDOS (no se proporcionó URL válida)
    private Locator contractValueComponent;
    private Locator breakdownPopup;
    private Locator breakdownItemsList;
    private Locator efectivoUsdField;
    private Locator efectivoUsdValue;
    private Locator closeBreakdownButton;
    private Locator buyButton;
    private Locator sellButton;
    private Locator consultationModeIndicator;
    private Locator headerComponent;
    private Locator tooltipElements;

    public ContractBreakdownPage(Page page) {
        this.page = page;
        this.contractValueComponent = page.locator("[data-testid='contract-value-component']");
        this.breakdownPopup = page.locator("[data-testid='breakdown-popup']");
        this.breakdownItemsList = page.locator("[data-testid='breakdown-items-list']");
        this.efectivoUsdField = page.locator("[data-testid='efectivo-usd-field']");
        this.efectivoUsdValue = page.locator("[data-testid='efectivo-usd-value']");
        this.closeBreakdownButton = page.locator("[data-testid='close-breakdown-button']");
        this.buyButton = page.locator("[data-testid='buy-operation-button']");
        this.sellButton = page.locator("[data-testid='sell-operation-button']");
        this.consultationModeIndicator = page.locator("[data-testid='consultation-mode-indicator']");
        this.headerComponent = page.locator("[data-testid='contract-header-component']");
        this.tooltipElements = page.locator("[data-testid='info-tooltip']");
    }

    public void clickContractValueComponent() {
        contractValueComponent.click();
    }

    public boolean isBreakdownPopupVisible() {
        return breakdownPopup.isVisible();
    }

    public boolean hasBreakdownItems() {
        return breakdownItemsList.locator("[data-testid='breakdown-item']").count() > 0;
    }

    public boolean isEfectivoUsdFieldVisible() {
        return efectivoUsdField.isVisible();
    }

    public String getEfectivoUsdValue() {
        if (efectivoUsdValue.isVisible()) {
            return efectivoUsdValue.textContent();
        }
        return null;
    }

    public boolean isValidUsdFormat(String value) {
        if (value == null || value.isEmpty()) {
            return false;
        }
        Pattern usdPattern = Pattern.compile("^\\$?[0-9]{1,3}(,[0-9]{3})*\\.?[0-9]{0,2}\\s?(USD)?$");
        return usdPattern.matcher(value.trim()).matches();
    }

    public void closeBreakdownPopup() {
        if (breakdownPopup.isVisible()) {
            closeBreakdownButton.click();
            breakdownPopup.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN));
        }
    }

    public boolean isContractInConsultationMode() {
        return consultationModeIndicator.isVisible();
    }

    public boolean isBuyButtonDisabled() {
        return buyButton.isDisabled();
    }

    public boolean isSellButtonDisabled() {
        return sellButton.isDisabled();
    }

    public String getContractTotalValue() {
        return contractValueComponent.textContent();
    }

    public boolean isHeaderComponentVisible() {
        return headerComponent.isVisible();
    }

    public int getBreakdownItemsCount() {
        return breakdownItemsList.locator("[data-testid='breakdown-item']").count();
    }
}