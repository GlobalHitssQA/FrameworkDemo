package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfilePage {
    private Page page;
    private static final String BASE_URL = "https://github.com";
    
    private Locator searchInput;
    private Locator searchButton;
    private Locator profileSection;
    private Locator userAvatar;
    private Locator userName;
    private Locator userBio;
    private Locator locationField;
    private Locator companyField;
    private Locator webLinkField;
    private Locator followersSection;
    private Locator errorMessage;

    public GitHubProfilePage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='search-input'], input[type='text'][placeholder*='username'], input[placeholder*='GitHub']");
        this.searchButton = page.locator("[data-testid='search-button'], button[type='submit'], button:has-text('Search')");
        this.profileSection = page.locator("[data-testid='profile-section'], .profile-container, .user-profile");
        this.userAvatar = page.locator("[data-testid='user-avatar'], .avatar, img[alt*='avatar']");
        this.userName = page.locator("[data-testid='user-name'], .user-name, .profile-name");
        this.userBio = page.locator("[data-testid='user-bio'], .user-bio, .biography");
        this.locationField = page.locator("[data-testid='user-location'], .location, .user-location");
        this.companyField = page.locator("[data-testid='user-company'], .company, .user-company");
        this.webLinkField = page.locator("[data-testid='user-website'], .website, .user-web-link");
        this.followersSection = page.locator("[data-testid='followers-section'], .followers-list, .followers-container");
        this.errorMessage = page.locator("[data-testid='error-message'], .error, .error-message");
    }

    public void navigateToApplication() {
        page.navigate(BASE_URL);
    }

    public boolean isSearchInputVisible() {
        return searchInput.first().isVisible();
    }

    public void enterUsername(String username) {
        searchInput.first().fill(username);
    }

    public void clickSearchButton() {
        searchButton.first().click();
    }

    public void waitForProfileLoad() {
        page.waitForTimeout(2000);
    }

    public boolean isProfileSectionVisible() {
        return profileSection.first().isVisible();
    }

    public String getLocationText() {
        return locationField.first().textContent();
    }

    public String getBiographyText() {
        return userBio.first().textContent();
    }

    public String getCompanyText() {
        return companyField.first().textContent();
    }

    public String getWebLinkText() {
        return webLinkField.first().textContent();
    }

    public boolean isLocationFieldEmpty() {
        String text = getLocationText();
        return text.contains("Not available") || text.contains("No disponible") || text.trim().isEmpty();
    }

    public boolean isBiographyFieldEmpty() {
        String text = getBiographyText();
        return text.contains("Not available") || text.contains("No disponible") || text.trim().isEmpty();
    }

    public boolean isCompanyFieldEmpty() {
        String text = getCompanyText();
        return text.contains("Not available") || text.contains("No disponible") || text.trim().isEmpty();
    }

    public boolean isWebLinkFieldEmpty() {
        String text = getWebLinkText();
        return text.contains("Not available") || text.contains("No disponible") || text.trim().isEmpty();
    }

    public boolean hasNotAvailableFields() {
        return isLocationFieldEmpty() || isBiographyFieldEmpty() || 
               isCompanyFieldEmpty() || isWebLinkFieldEmpty();
    }
}