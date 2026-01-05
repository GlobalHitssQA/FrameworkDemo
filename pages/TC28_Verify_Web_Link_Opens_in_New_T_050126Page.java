package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProfilePage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator webLink;
    private Locator userProfile;

    public ProfilePage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.webLink = page.locator("[data-testid='user-web-link']");
        this.userProfile = page.locator("[data-testid='user-profile-container']");
    }

    public void navigateToApplication() {
        page.navigate("https://github.com");
    }

    public void searchUser(String username) {
        searchInput.fill(username);
        searchButton.click();
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isWebLinkVisible() {
        return webLink.isVisible();
    }

    public String getWebLinkTargetAttribute() {
        return webLink.getAttribute("target");
    }

    public String getWebLinkHref() {
        return webLink.getAttribute("href");
    }

    public void clickWebLink() {
        webLink.click();
    }

    public boolean isUserProfileVisible() {
        return userProfile.isVisible();
    }
}