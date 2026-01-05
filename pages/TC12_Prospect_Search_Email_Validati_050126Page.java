package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;
import java.util.regex.Pattern;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator dashboardContainer;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator emailFields;
    
    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.dashboardContainer = page.locator("[data-testid='acticenter-dashboard']");
        this.searchResultsList = page.locator("[data-testid='search-results-list']");
        this.searchResultItems = page.locator("[data-testid='search-result-item']");
        this.emailFields = page.locator("[data-testid='prospect-email']");
    }
    
    public void navigateToDashboard() {
        page.navigate("https://actinver.atlassian.net/acticenter/dashboard");
        page.waitForLoadState();
    }
    
    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }
    
    public void enterProspectName(String prospectName) {
        searchInput.fill(prospectName);
    }
    
    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }
    
    public boolean areSearchResultsVisible() {
        return searchResultsList.isVisible() && searchResultItems.count() > 0;
    }
    
    public boolean allResultsContainEmail() {
        int resultCount = searchResultItems.count();
        int emailCount = emailFields.count();
        return resultCount > 0 && resultCount == emailCount;
    }
    
    public boolean allEmailsAreValid() {
        int emailCount = emailFields.count();
        for (int i = 0; i < emailCount; i++) {
            String emailText = emailFields.nth(i).textContent().trim();
            if (!EMAIL_PATTERN.matcher(emailText).matches()) {
                return false;
            }
        }
        return true;
    }
    
    public List<String> getAllEmails() {
        return emailFields.allTextContents();
    }
}