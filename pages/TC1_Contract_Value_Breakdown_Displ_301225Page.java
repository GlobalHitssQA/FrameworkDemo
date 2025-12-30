package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Contract Value functionality in Acticenter OTA platform.
 * 
 * LOCATORS SOURCE: INFERIDO (inferred)
 * These locators are inferred based on best practices and semantic naming conventions
 * as no valid URL was provided for real element extraction.
 */
public class ContractValuePage {

    private Page page;
    
    // Header and Navigation Locators (INFERIDO)
    private Locator contractHeader;
    private Locator contractInfoSection;
    private Locator mainContractView;
    
    // Contract Value Component Locators (INFERIDO)
    private Locator contractValueComponent;
    private Locator totalContractValue;
    
    // Breakdown Popup Locators (INFERIDO)
    private Locator breakdownPopup;
    private Locator breakdownCloseButton;
    private Locator breakdownOverlay;
    
    // Breakdown Items Locators (INFERIDO)
    private Locator poderDeCompraMXN;
    private Locator efectivoUSD;
    private Locator pendientesPorLiquidar;
    private Locator fondosDeDeuda;
    private Locator fondosDeCobertura;
    private Locator fondosDeRentaVariable;
    private Locator cedesYPagares;
    private Locator mercadoDeDinero;
    private Locator mercadoDeCapitales;
    private Locator breakdownItemsList;
    private Locator breakdownValuesList;

    public ContractValuePage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Header and Navigation (INFERIDO - using data-testid pattern)
        this.contractHeader = page.locator("[data-testid='contract-header']");
        this.contractInfoSection = page.locator("[data-testid='contract-info-section']");
        this.mainContractView = page.locator("[data-testid='main-contract-view']");
        
        // Contract Value Component (INFERIDO - using semantic selectors)
        this.contractValueComponent = page.locator("[data-testid='contract-value-component']");
        this.totalContractValue = page.locator("[data-testid='total-contract-value']");
        
        // Breakdown Popup (INFERIDO - using role and data-testid)
        this.breakdownPopup = page.locator("[data-testid='breakdown-popup'], [role='dialog'][aria-label*='desglose']");
        this.breakdownCloseButton = page.locator("[data-testid='breakdown-close-button'], [aria-label='Cerrar desglose']");
        this.breakdownOverlay = page.locator("[data-testid='breakdown-overlay'], .popup-overlay, .modal-backdrop");
        
        // Breakdown Items (INFERIDO - using data-testid with semantic naming)
        this.poderDeCompraMXN = page.locator("[data-testid='breakdown-item-poder-compra-mxn']");
        this.efectivoUSD = page.locator("[data-testid='breakdown-item-efectivo-usd']");
        this.pendientesPorLiquidar = page.locator("[data-testid='breakdown-item-pendientes-liquidar']");
        this.fondosDeDeuda = page.locator("[data-testid='breakdown-item-fondos-deuda']");
        this.fondosDeCobertura = page.locator("[data-testid='breakdown-item-fondos-cobertura']");
        this.fondosDeRentaVariable = page.locator("[data-testid='breakdown-item-fondos-renta-variable']");
        this.cedesYPagares = page.locator("[data-testid='breakdown-item-cedes-pagares']");
        this.mercadoDeDinero = page.locator("[data-testid='breakdown-item-mercado-dinero']");
        this.mercadoDeCapitales = page.locator("[data-testid='breakdown-item-mercado-capitales']");
        
        // Lists for iteration (INFERIDO)
        this.breakdownItemsList = page.locator("[data-testid='breakdown-popup'] [data-testid^='breakdown-item-']");
        this.breakdownValuesList = page.locator("[data-testid='breakdown-popup'] [data-testid$='-value']");
    }

    // Navigation Methods
    public void scrollToContractValueComponent() {
        contractValueComponent.scrollIntoViewIfNeeded();
    }

    // Visibility Check Methods
    public boolean isContractHeaderVisible() {
        return contractHeader.isVisible();
    }

    public boolean isContractInfoDisplayed() {
        return contractInfoSection.isVisible();
    }

    public boolean isContractValueComponentVisible() {
        return contractValueComponent.isVisible();
    }

    public boolean isTotalValueDisplayed() {
        return totalContractValue.isVisible() && !totalContractValue.textContent().isEmpty();
    }

    public boolean isBreakdownPopupVisible() {
        return breakdownPopup.isVisible();
    }

    public boolean isMainContractViewDisplayed() {
        return mainContractView.isVisible();
    }

    public boolean isBreakdownItemVisible(String itemName) {
        String normalizedName = normalizeItemName(itemName);
        Locator itemLocator = page.locator("[data-testid='breakdown-item-" + normalizedName + "']");
        return itemLocator.isVisible();
    }

    // Interaction Methods
    public void clickContractValueComponent() {
        contractValueComponent.click();
        breakdownPopup.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public void clickBreakdownCloseButton() {
        breakdownCloseButton.click();
    }

    public void clickOutsideBreakdownPopup() {
        // Click on the overlay/backdrop area outside the popup
        if (breakdownOverlay.isVisible()) {
            breakdownOverlay.click(new Locator.ClickOptions().setPosition(10, 10));
        } else {
            // Fallback: press Escape key to close
            page.keyboard().press("Escape");
        }
    }

    // Value Retrieval Methods
    public String getTotalContractValue() {
        return totalContractValue.textContent().trim();
    }

    public String getPoderDeCompraMXNValue() {
        Locator valueLocator = poderDeCompraMXN.locator("[data-testid='breakdown-value']");
        if (!valueLocator.isVisible()) {
            valueLocator = poderDeCompraMXN.locator(".breakdown-value, .value-amount");
        }
        return valueLocator.textContent().trim();
    }

    public String getBreakdownItemValue(String itemName) {
        String normalizedName = normalizeItemName(itemName);
        Locator itemLocator = page.locator("[data-testid='breakdown-item-" + normalizedName + "'] [data-testid='breakdown-value']");
        return itemLocator.textContent().trim();
    }

    // Validation Methods
    public boolean isValidMonetaryFormat(String value) {
        // Validates format like $1,234.56 or $0.00
        return value != null && value.matches("^\\$[\\d,]+\\.\\d{2}$");
    }

    public boolean areAllValuesRightAligned() {
        int count = breakdownValuesList.count();
        for (int i = 0; i < count; i++) {
            Locator valueElement = breakdownValuesList.nth(i);
            String textAlign = valueElement.evaluate("el => window.getComputedStyle(el).textAlign").toString();
            if (!"right".equals(textAlign) && !"end".equals(textAlign)) {
                return false;
            }
        }
        return true;
    }

    public boolean doEmptyItemsShowZeroValue() {
        int count = breakdownValuesList.count();
        for (int i = 0; i < count; i++) {
            Locator valueElement = breakdownValuesList.nth(i);
            String value = valueElement.textContent().trim();
            // If value appears empty or null in data, it should display $0.00
            if (value.isEmpty()) {
                return false; // Empty values should show $0.00, not be blank
            }
        }
        return true;
    }

    // Helper Methods
    private String normalizeItemName(String itemName) {
        // Convert display name to data-testid format
        // e.g., "Poder de compra MXN" -> "poder-compra-mxn"
        return itemName.toLowerCase()
            .replace("á", "a")
            .replace("é", "e")
            .replace("í", "i")
            .replace("ó", "o")
            .replace("ú", "u")
            .replace("ñ", "n")
            .replaceAll("\\s+de\\s+", "-")
            .replaceAll("\\s+por\\s+", "-")
            .replaceAll("\\s+y\\s+", "-")
            .replaceAll("\\s+", "-");
    }
}

// =============================================================================
// Additional Page Objects for complete test flow
// =============================================================================

/**
 * Page Object for Login functionality.
 * LOCATORS SOURCE: INFERIDO (inferred)
 */
class LoginPage {

    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator dashboardElement;
    private Locator loginForm;

    private static final String BASE_URL = "https://acticenter.example.com"; // Placeholder - replace with actual URL

    public LoginPage(Page page) {
        this.page = page;
        // Locators (INFERIDO - using semantic data-testid and standard patterns)
        this.usernameInput = page.locator("[data-testid='username-input'], #username, input[name='username']");
        this.passwordInput = page.locator("[data-testid='password-input'], #password, input[name='password']");
        this.loginButton = page.locator("[data-testid='login-button'], button[type='submit']");
        this.dashboardElement = page.locator("[data-testid='dashboard'], [data-testid='main-dashboard']");
        this.loginForm = page.locator("[data-testid='login-form'], form#login-form, .login-form");
    }

    public void navigateToLoginPage() {
        page.navigate(BASE_URL + "/login");
    }

    public boolean isLoginPageDisplayed() {
        return loginForm.isVisible();
    }

    public void login(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
    }

    public boolean isDashboardDisplayed() {
        dashboardElement.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return dashboardElement.isVisible();
    }
}

/**
 * Page Object for Contract Search functionality.
 * LOCATORS SOURCE: INFERIDO (inferred)
 */
class ContractSearchPage {

    private Page page;
    private Locator searchButton;
    private Locator searchInput;
    private Locator accountTypeDropdown;
    private Locator searchExecuteButton;
    private Locator searchResultsList;
    private Locator firstSearchResult;

    public ContractSearchPage(Page page) {
        this.page = page;
        // Locators (INFERIDO - using semantic data-testid)
        this.searchButton = page.locator("[data-testid='search-button'], [aria-label='Buscar'], .search-icon, button.lupa");
        this.searchInput = page.locator("[data-testid='search-input'], input[placeholder*='Buscar'], #contract-search");
        this.accountTypeDropdown = page.locator("[data-testid='account-type-dropdown'], select#account-type, [aria-label='Tipo de cuenta']");
        this.searchExecuteButton = page.locator("[data-testid='execute-search'], button[type='submit']");
        this.searchResultsList = page.locator("[data-testid='search-results-list'], .search-results, ul.contracts-list");
        this.firstSearchResult = page.locator("[data-testid='search-result-item']:first-child, .search-results li:first-child, [data-testid='contract-item']:first-of-type");
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void enterSearchCriteria(String criteria) {
        searchInput.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        searchInput.fill(criteria);
    }

    public void selectAccountType(String accountType) {
        accountTypeDropdown.selectOption(accountType);
    }

    public void executeSearch() {
        searchExecuteButton.click();
        searchResultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public void selectFirstContractFromResults() {
        firstSearchResult.click();
    }

    public boolean areSearchResultsDisplayed() {
        return searchResultsList.isVisible() && firstSearchResult.isVisible();
    }
}