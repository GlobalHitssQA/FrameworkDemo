package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubSearchPage {

    private Page page;
    
    // Locators - REALES (extraídos con Playwright)
    private Locator searchInput;
    private Locator noResultsHeading;
    private Locator resultsCount;
    private Locator noResultsImage;

    private static final String BASE_URL = "https://github.com";
    private static final String SEARCH_USERS_URL = BASE_URL + "/search?type=users";

    public GitHubSearchPage(Page page) {
        this.page = page;
        // Locator real: input de búsqueda con role textbox y name "Search GitHub"
        this.searchInput = page.getByRole(com.microsoft.playwright.options.AriaRole.TEXTBOX, 
            new Page.GetByRoleOptions().setName("Search GitHub"));
        // Locator real: heading con mensaje de no resultados
        this.noResultsHeading = page.getByRole(com.microsoft.playwright.options.AriaRole.HEADING, 
            new Page.GetByRoleOptions().setName("Your search did not match any users"));
        // Locator real: texto que muestra "0 results"
        this.resultsCount = page.getByRole(com.microsoft.playwright.options.AriaRole.HEADING, 
            new Page.GetByRoleOptions().setName("0 results"));
        // Locator real: imagen ilustrativa de Mona cuando no hay resultados
        this.noResultsImage = page.getByRole(com.microsoft.playwright.options.AriaRole.IMG, 
            new Page.GetByRoleOptions().setName("Mona looking through a globe hologram for code"));
    }

    public void navigateToSearchPage() {
        page.navigate(SEARCH_USERS_URL);
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public void enterSearchQuery(String query) {
        searchInput.fill(query);
    }

    public void submitSearch() {
        searchInput.press("Enter");
    }

    public void waitForSearchResults() {
        page.waitForSelector("h3:has-text('Your search did not match')", 
            new Page.WaitForSelectorOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    public boolean isNoResultsMessageDisplayed() {
        return noResultsHeading.isVisible();
    }

    public boolean isZeroResultsCountDisplayed() {
        return resultsCount.isVisible();
    }

    public boolean isNoResultsImageDisplayed() {
        return noResultsImage.isVisible();
    }

    public String getNoResultsMessageText() {
        return noResultsHeading.textContent();
    }
}