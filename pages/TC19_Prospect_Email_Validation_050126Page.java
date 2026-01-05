package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

import java.util.ArrayList;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator resultsContainer;
    private Locator prospectItems;
    private Locator emailFields;
    private Locator prospectNames;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos basados en buenas prácticas
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.resultsContainer = page.locator("[data-testid='search-results-container']");
        this.prospectItems = page.locator("[data-testid='prospect-item']");
        this.emailFields = page.locator("[data-testid='prospect-email']");
        this.prospectNames = page.locator("[data-testid='prospect-name']");
    }

    public void navigateToProspectSearch() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
    }

    public boolean isSearchInterfaceVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterSearchCriteria(String criteria) {
        searchInput.fill(criteria);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        resultsContainer.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
    }

    public boolean areResultsDisplayed() {
        return resultsContainer.isVisible() && prospectItems.count() > 0;
    }

    public List<String> getDisplayedEmails() {
        List<String> emails = new ArrayList<>();
        int count = emailFields.count();
        for (int i = 0; i < count; i++) {
            String email = emailFields.nth(i).textContent().trim();
            if (!email.isEmpty()) {
                emails.add(email);
            }
        }
        return emails;
    }

    public List<String> getProspectNames() {
        List<String> names = new ArrayList<>();
        int count = prospectNames.count();
        for (int i = 0; i < count; i++) {
            names.add(prospectNames.nth(i).textContent().trim());
        }
        return names;
    }

    public String getEmailForProspect(String prospectName) {
        Locator prospect = page.locator("[data-testid='prospect-item']"
            + ":has([data-testid='prospect-name']:text-is('" + prospectName + "'))");
        Locator emailField = prospect.locator("[data-testid='prospect-email']");
        return emailField.isVisible() ? emailField.textContent().trim() : null;
    }
}