package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Prospect Search functionality in Acticenter
 * LOCATORS: INFERIDOS - No se pudo acceder a la aplicación real (URL redirige a login de Atlassian)
 */
public class ProspectSearchPage {

    private Page page;
    
    // Locators - INFERIDOS basados en buenas prácticas y contexto del proyecto
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator prospectNameElements;
    private Locator prospectEmailElements;
    private Locator selectedProspectIndicator;
    private Locator continueButton;
    private Locator validationErrorMessage;
    private Locator advisorDashboard;
    private Locator salesforceConnectionIndicator;
    private Locator createNewProspectButton;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo convenciones de data-testid y selectores semánticos
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        this.prospectNameElements = page.locator("[data-testid='prospect-result-item'] [data-testid='prospect-name']");
        this.prospectEmailElements = page.locator("[data-testid='prospect-result-item'] [data-testid='prospect-email']");
        this.selectedProspectIndicator = page.locator("[data-testid='prospect-result-item'].selected, [data-testid='prospect-result-item'][aria-selected='true']");
        this.continueButton = page.locator("[data-testid='continue-button']");
        this.validationErrorMessage = page.locator("[data-testid='validation-error-message']");
        this.advisorDashboard = page.locator("[data-testid='advisor-dashboard']");
        this.salesforceConnectionIndicator = page.locator("[data-testid='salesforce-connection-status']");
        this.createNewProspectButton = page.locator("[data-testid='create-new-prospect-button']");
    }

    public void navigateToApplication() {
        page.navigate("https://acticenter.actinver.com");
    }

    public void navigateToProspectSearch() {
        page.locator("[data-testid='prospect-search-menu-item']").click();
        page.waitForSelector("[data-testid='prospect-search-input']", 
            new Page.WaitForSelectorOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isAdvisorDashboardDisplayed() {
        return advisorDashboard.isVisible();
    }

    public boolean isSalesforceConnected() {
        return salesforceConnectionIndicator.isVisible() && 
               salesforceConnectionIndicator.getAttribute("data-status") != null &&
               salesforceConnectionIndicator.getAttribute("data-status").equals("connected");
    }

    public boolean isSearchScreenDisplayed() {
        return page.locator("[data-testid='prospect-search-screen']").isVisible();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public void enterSearchTerm(String searchTerm) {
        searchField.clear();
        searchField.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        page.waitForSelector("[data-testid='prospect-results-list']", 
            new Page.WaitForSelectorOptions().setState(WaitForSelectorState.VISIBLE));
        page.waitForLoadState();
    }

    public boolean areSearchResultsDisplayed() {
        return searchResultsList.isVisible();
    }

    public int getSearchResultsCount() {
        return searchResultItems.count();
    }

    public boolean areProspectNamesVisible() {
        return prospectNameElements.count() > 0 && prospectNameElements.first().isVisible();
    }

    public boolean areProspectEmailsVisible() {
        return prospectEmailElements.count() > 0 && prospectEmailElements.first().isVisible();
    }

    public String getFirstProspectName() {
        return prospectNameElements.first().textContent().trim();
    }

    public String getFirstProspectEmail() {
        return prospectEmailElements.first().textContent().trim();
    }

    public void selectFirstProspectWithEmail() {
        Locator prospectsWithEmail = page.locator("[data-testid='prospect-result-item']:has([data-testid='prospect-email']:not(:empty))");
        prospectsWithEmail.first().click();
    }

    public boolean isProspectSelected() {
        return selectedProspectIndicator.isVisible();
    }

    public void clickContinueButton() {
        continueButton.click();
    }

    public boolean isValidationErrorDisplayed() {
        return validationErrorMessage.isVisible();
    }

    public String getValidationErrorText() {
        if (isValidationErrorDisplayed()) {
            return validationErrorMessage.textContent();
        }
        return "";
    }

    public void clickCreateNewProspect() {
        createNewProspectButton.click();
    }
}

// Archivo adicional: ProspectDetailsPage.java
package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Prospect Details screen (next screen after selection)
 * LOCATORS: INFERIDOS - No se pudo acceder a la aplicación real
 */
public class ProspectDetailsPage {

    private Page page;
    
    // Locators inferidos
    private Locator pageContainer;
    private Locator prospectNameDisplay;
    private Locator prospectEmailDisplay;
    private Locator prospectInfoSection;

    public ProspectDetailsPage(Page page) {
        this.page = page;
        this.pageContainer = page.locator("[data-testid='prospect-details-screen']");
        this.prospectNameDisplay = page.locator("[data-testid='prospect-detail-name']");
        this.prospectEmailDisplay = page.locator("[data-testid='prospect-detail-email']");
        this.prospectInfoSection = page.locator("[data-testid='prospect-info-section']");
    }

    public void waitForPageLoad() {
        page.waitForSelector("[data-testid='prospect-details-screen']", 
            new Page.WaitForSelectorOptions().setState(WaitForSelectorState.VISIBLE));
        page.waitForLoadState();
    }

    public boolean isPageDisplayed() {
        return pageContainer.isVisible();
    }

    public String getProspectName() {
        return prospectNameDisplay.textContent().trim();
    }

    public String getProspectEmail() {
        return prospectEmailDisplay.textContent().trim();
    }

    public boolean isProspectInfoDisplayed() {
        return prospectInfoSection.isVisible();
    }
}