package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator resultsList;
    private Locator firstProspectName;
    private Locator firstProspectEmail;
    private Locator firstProspectSelectButton;
    private Locator selectedProspectHighlight;
    private Locator confirmSelectionButton;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos basados en buenas prácticas
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsList = page.locator("[data-testid='search-results-list']");
        this.firstProspectName = page.locator("[data-testid='prospect-name']").first();
        this.firstProspectEmail = page.locator("[data-testid='prospect-email']").first();
        this.firstProspectSelectButton = page.locator("[data-testid='select-prospect-button']").first();
        this.selectedProspectHighlight = page.locator("[data-testid='prospect-item'].selected").first();
        this.confirmSelectionButton = page.locator("[data-testid='confirm-selection-button']");
    }

    public void navigateToDashboard() {
        page.navigate("https://actinver.atlassian.net/dashboard");
    }

    public void performSearch(String searchTerm) {
        searchInput.fill(searchTerm);
        searchButton.click();
        resultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean areResultsVisible() {
        return resultsList.isVisible();
    }

    public boolean isProspectNameVisible() {
        return firstProspectName.isVisible();
    }

    public boolean isProspectEmailVisible() {
        return firstProspectEmail.isVisible();
    }

    public String getFirstProspectName() {
        return firstProspectName.textContent();
    }

    public String getFirstProspectEmail() {
        return firstProspectEmail.textContent();
    }

    public void selectFirstProspect() {
        firstProspectSelectButton.click();
    }

    public boolean isProspectSelected() {
        return selectedProspectHighlight.isVisible();
    }

    public void clickConfirmSelection() {
        confirmSelectionButton.click();
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectDetailsPage {
    private Page page;
    private Locator prospectNameField;
    private Locator prospectEmailField;
    private Locator additionalDataContainer;
    private Locator prospectDetailsContainer;

    public ProspectDetailsPage(Page page) {
        this.page = page;
        // Locators inferidos basados en buenas prácticas
        this.prospectNameField = page.locator("[data-testid='prospect-detail-name']");
        this.prospectEmailField = page.locator("[data-testid='prospect-detail-email']");
        this.additionalDataContainer = page.locator("[data-testid='prospect-additional-data']");
        this.prospectDetailsContainer = page.locator("[data-testid='prospect-details-container']");
    }

    public void waitForPageLoad() {
        prospectDetailsContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public String getProspectName() {
        return prospectNameField.textContent();
    }

    public String getProspectEmail() {
        return prospectEmailField.textContent();
    }

    public boolean isProspectNameVisible() {
        return prospectNameField.isVisible();
    }

    public boolean isProspectEmailVisible() {
        return prospectEmailField.isVisible();
    }

    public boolean areAdditionalFieldsVisible() {
        return additionalDataContainer.isVisible();
    }

    public boolean validateDataIntegrity() {
        String name = getProspectName();
        String email = getProspectEmail();
        
        return name != null && !name.isEmpty() && 
               email != null && !email.isEmpty() && 
               email.contains("@");
    }
}