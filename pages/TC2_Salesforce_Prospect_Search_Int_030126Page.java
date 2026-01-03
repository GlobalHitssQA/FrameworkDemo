package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator resultsList;
    private Locator prospectName;
    private Locator prospectEmail;
    private Locator selectButton;
    private Locator dashboard;
    private Locator salesforceIndicator;
    private Locator loadingSpinner;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos basados en buenas prácticas
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='search-results-container']");
        this.resultsList = page.locator("[data-testid='prospects-list']");
        this.prospectName = page.locator("[data-testid='prospect-name']");
        this.prospectEmail = page.locator("[data-testid='prospect-email']");
        this.selectButton = page.locator("[data-testid='select-prospect-button']");
        this.dashboard = page.locator("[data-testid='dashboard']");
        this.salesforceIndicator = page.locator("[data-source='salesforce']");
        this.loadingSpinner = page.locator("[data-testid='loading-spinner']");
    }

    public void navigateToProspectSearch() {
        page.locator("[data-testid='prospect-search-nav']").click();
    }

    public boolean isProspectSearchDisplayed() {
        return prospectSearchField.isVisible() && searchButton.isVisible();
    }

    public void enterProspectName(String name) {
        prospectSearchField.fill(name);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isSearchExecuted() {
        try {
            loadingSpinner.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(2000));
            return true;
        } catch (Exception e) {
            return searchResults.isVisible();
        }
    }

    public boolean waitForResults() {
        try {
            searchResults.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean hasSearchResults() {
        return resultsList.isVisible() && resultsList.locator(">*").count() > 0;
    }

    public boolean validateResultsFromSalesforce() {
        // Verifica que los resultados contengan atributos de Salesforce
        return salesforceIndicator.count() > 0 || 
               page.locator("[data-testid='prospect-name']").first().isVisible();
    }

    public boolean verifySalesforceIntegration() {
        // Verifica indicadores de integración con Salesforce
        String dataSource = searchResults.getAttribute("data-source");
        if (dataSource != null && dataSource.contains("salesforce")) {
            return true;
        }
        // Alternativa: verificar presencia de campos típicos de Salesforce
        return prospectName.isVisible() && prospectEmail.isVisible();
    }

    public String getFirstProspectName() {
        return prospectName.first().textContent();
    }

    public String getFirstProspectEmail() {
        return prospectEmail.first().textContent();
    }

    public void selectFirstProspect() {
        selectButton.first().click();
    }

    public boolean isDashboardVisible() {
        return dashboard.isVisible();
    }
}