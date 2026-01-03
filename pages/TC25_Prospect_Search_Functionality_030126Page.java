package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator resultsList;
    private Locator resultItems;
    private Locator prospectNames;
    private Locator prospectEmails;
    private Locator resultsContainer;
    private Locator dashboard;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsList = page.locator("[data-testid='prospect-results-list']");
        this.resultItems = page.locator("[data-testid='prospect-result-item']");
        this.prospectNames = page.locator("[data-testid='prospect-name']");
        this.prospectEmails = page.locator("[data-testid='prospect-email']");
        this.resultsContainer = page.locator("[data-testid='results-container']");
        this.dashboard = page.locator("[data-testid='advisor-dashboard']");
    }

    public boolean isDashboardVisible() {
        return dashboard.isVisible();
    }

    public void enterSearchTerm(String searchTerm) {
        searchField.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        resultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean areResultsDisplayed() {
        return resultsList.isVisible();
    }

    public int getResultsCount() {
        return resultItems.count();
    }

    public boolean areNamesVisible() {
        return prospectNames.first().isVisible() && prospectNames.count() > 0;
    }

    public boolean areEmailsVisible() {
        return prospectEmails.first().isVisible() && prospectEmails.count() > 0;
    }

    public boolean areMatchingCharactersBold(String searchTerm) {
        Locator boldText = prospectNames.locator("strong, b").first();
        if (!boldText.isVisible()) {
            return false;
        }
        String boldContent = boldText.textContent().toLowerCase();
        return boldContent.contains(searchTerm.toLowerCase());
    }

    public int getVisibleResultsCount() {
        int count = 0;
        for (int i = 0; i < resultItems.count(); i++) {
            if (resultItems.nth(i).isVisible()) {
                count++;
            }
        }
        return count;
    }

    public boolean isScrollVisible() {
        String overflowY = (String) resultsContainer.evaluate("el => window.getComputedStyle(el).overflowY");
        Double scrollHeight = (Double) resultsContainer.evaluate("el => el.scrollHeight");
        Double clientHeight = (Double) resultsContainer.evaluate("el => el.clientHeight");
        return (overflowY.equals("auto") || overflowY.equals("scroll")) && scrollHeight > clientHeight;
    }

    public void scrollToLastResult() {
        resultItems.last().scrollIntoViewIfNeeded();
    }

    public boolean allResultsHaveNameAndEmail() {
        int namesCount = prospectNames.count();
        int emailsCount = prospectEmails.count();
        int itemsCount = resultItems.count();
        
        if (namesCount != itemsCount || emailsCount != itemsCount) {
            return false;
        }
        
        for (int i = 0; i < itemsCount; i++) {
            String name = prospectNames.nth(i).textContent();
            String email = prospectEmails.nth(i).textContent();
            if (name == null || name.trim().isEmpty() || email == null || email.trim().isEmpty()) {
                return false;
            }
        }
        return true;
    }
}