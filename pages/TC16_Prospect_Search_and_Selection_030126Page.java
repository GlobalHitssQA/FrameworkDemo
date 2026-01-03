package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator resultsList;
    private Locator prospectItems;
    private Locator firstProspectName;
    private Locator firstProspectEmail;
    private Locator firstProspectItem;
    private Locator confirmButton;
    private Locator nextScreenProspectName;
    private Locator nextScreenProspectEmail;
    private Locator dashboardIndicator;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsList = page.locator("[data-testid='prospect-results-list']");
        this.prospectItems = page.locator("[data-testid='prospect-item']");
        this.firstProspectName = page.locator("[data-testid='prospect-item']:first-child [data-testid='prospect-name']");
        this.firstProspectEmail = page.locator("[data-testid='prospect-item']:first-child [data-testid='prospect-email']");
        this.firstProspectItem = page.locator("[data-testid='prospect-item']:first-child");
        this.confirmButton = page.locator("[data-testid='confirm-selection-button']");
        this.nextScreenProspectName = page.locator("[data-testid='selected-prospect-name']");
        this.nextScreenProspectEmail = page.locator("[data-testid='selected-prospect-email']");
        this.dashboardIndicator = page.locator("[data-testid='dashboard']");
    }

    public void navigateToSearchPage() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchTerm(String searchTerm) {
        searchField.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isResultsListVisible() {
        resultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return resultsList.isVisible();
    }

    public int getResultsCount() {
        return prospectItems.count();
    }

    public boolean isFirstProspectNameVisible() {
        return firstProspectName.isVisible();
    }

    public boolean isFirstProspectEmailVisible() {
        return firstProspectEmail.isVisible();
    }

    public String getFirstProspectName() {
        return firstProspectName.textContent();
    }

    public String getFirstProspectEmail() {
        return firstProspectEmail.textContent();
    }

    public void selectFirstProspect() {
        firstProspectItem.click();
    }

    public boolean isFirstProspectSelected() {
        String selectedClass = firstProspectItem.getAttribute("class");
        return selectedClass != null && (selectedClass.contains("selected") || selectedClass.contains("highlighted"));
    }

    public void clickConfirmButton() {
        confirmButton.click();
    }

    public void waitForNavigationToNextScreen() {
        page.waitForURL("**/prospect-details**");
    }

    public boolean isOnNextScreen() {
        return dashboardIndicator.isVisible() || nextScreenProspectName.isVisible();
    }

    public String getDisplayedProspectName() {
        return nextScreenProspectName.textContent();
    }

    public String getDisplayedProspectEmail() {
        return nextScreenProspectEmail.textContent();
    }
}