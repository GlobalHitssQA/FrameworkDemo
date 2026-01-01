package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS (basados en buenas prácticas para aplicación personalizada de búsqueda de perfiles GitHub)
 */
public class GitHubProfileSearchPage {

    private final Page page;
    private final String baseUrl = "https://github.com"; // URL base inferida - reemplazar con URL real de la aplicación

    // Locators - INFERIDOS (data-testid semánticos y selectores CSS estables)
    private final Locator searchInput;
    private final Locator searchButton;
    private final Locator profileSection;
    private final Locator biographyField;
    private final Locator userAvatar;
    private final Locator userFullName;
    private final Locator userName;
    private final Locator userLocation;
    private final Locator userCompany;
    private final Locator userWebsite;
    private final Locator followersCount;
    private final Locator followingCount;
    private final Locator reposCount;
    private final Locator gistsCount;
    private final Locator errorMessage;
    private final Locator loadingIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        
        // Search components - INFERIDOS
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        
        // Profile section - INFERIDOS
        this.profileSection = page.locator("[data-testid='profile-section']");
        this.biographyField = page.locator("[data-testid='user-biography']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.userName = page.locator("[data-testid='user-username']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebsite = page.locator("[data-testid='user-website']");
        
        // Metrics dashboard - INFERIDOS
        this.followersCount = page.locator("[data-testid='followers-count']");
        this.followingCount = page.locator("[data-testid='following-count']");
        this.reposCount = page.locator("[data-testid='repos-count']");
        this.gistsCount = page.locator("[data-testid='gists-count']");
        
        // Error and loading states - INFERIDOS
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.loadingIndicator = page.locator("[data-testid='loading-indicator']");
    }

    public void navigateToSearchPage() {
        page.navigate(baseUrl);
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.clear();
        searchInput.fill(username);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileToLoad() {
        loadingIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN).setTimeout(10000));
        profileSection.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    public boolean isProfileSectionVisible() {
        return profileSection.isVisible();
    }

    public boolean isBiographyFieldPresent() {
        return biographyField.isVisible();
    }

    public String getBiographyText() {
        if (biographyField.isVisible()) {
            return biographyField.textContent().trim();
        }
        return "";
    }

    public String getUserFullName() {
        return userFullName.textContent().trim();
    }

    public String getUserName() {
        return userName.textContent().trim();
    }

    public String getUserLocation() {
        if (userLocation.isVisible()) {
            return userLocation.textContent().trim();
        }
        return "Not available";
    }

    public String getUserCompany() {
        if (userCompany.isVisible()) {
            return userCompany.textContent().trim();
        }
        return "Not available";
    }

    public String getUserWebsite() {
        if (userWebsite.isVisible()) {
            return userWebsite.textContent().trim();
        }
        return "Not available";
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getFollowersCount() {
        return followersCount.textContent().trim();
    }

    public String getFollowingCount() {
        return followingCount.textContent().trim();
    }

    public String getReposCount() {
        return reposCount.textContent().trim();
    }

    public String getGistsCount() {
        return gistsCount.textContent().trim();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent().trim();
    }
}