package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class DashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator prospectSearchLink;

    public DashboardPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchLink = page.locator("[data-testid='prospect-search-link']");
    }

    public void waitForDashboardToLoad() {
        dashboardContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public void accessProspectSearch() {
        prospectSearchLink.click();
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator noResultsMessage;
    private Locator createNewProspectLink;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-search-results']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.createNewProspectLink = page.locator("[data-testid='create-new-prospect-link']");
    }

    public void enterSearchTerm(String searchTerm) {
        searchField.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void verifySearchResultsDisplayed() {
        try {
            searchResultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(3000));
        } catch (Exception e) {
            noResultsMessage.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        }
    }

    public void clickCreateNewProspectLink() {
        createNewProspectLink.click();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public String getSearchResultsText() {
        return searchResultsList.textContent();
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class NewProspectPage {
    private Page page;
    private Locator newProspectForm;
    private Locator pageTitle;

    public NewProspectPage(Page page) {
        this.page = page;
        this.newProspectForm = page.locator("[data-testid='new-prospect-form']");
        this.pageTitle = page.locator("[data-testid='new-prospect-page-title']");
    }

    public void verifyNewProspectPageIsDisplayed() {
        newProspectForm.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isNewProspectFormVisible() {
        return newProspectForm.isVisible();
    }

    public String getPageTitle() {
        return pageTitle.textContent();
    }
}