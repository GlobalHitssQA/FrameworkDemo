package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

import java.util.List;

public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Locators - INFERIDOS (aplicación personalizada de búsqueda de perfiles GitHub)
    private Locator searchInput;
    private Locator searchButton;
    private Locator profileContainer;
    private Locator userAvatar;
    private Locator userName;
    private Locator userFullName;
    private Locator userBiography;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebsite;
    private Locator followersCount;
    private Locator followingCount;
    private Locator reposCount;
    private Locator gistsCount;
    private Locator followButton;
    private Locator errorMessage;
    private Locator noDisponibleLabels;
    private Locator metricsContainer;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Locators inferidos basados en buenas prácticas de data-testid y selectores semánticos
        this.searchInput = page.locator("[data-testid='search-input'], input[placeholder*='usuario'], input[placeholder*='user'], #search-input");
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label*='buscar'], button[aria-label*='search'], .search-button");
        this.profileContainer = page.locator("[data-testid='profile-container'], .profile-container, #profile-container, [class*='profile-card']");
        this.userAvatar = page.locator("[data-testid='user-avatar'], .user-avatar, img[alt*='avatar'], .avatar-user");
        this.userName = page.locator("[data-testid='username'], .username, .user-login, [class*='username']");
        this.userFullName = page.locator("[data-testid='user-fullname'], .user-fullname, .full-name, [class*='fullname']");
        this.userBiography = page.locator("[data-testid='user-bio'], .user-bio, .biography, [class*='bio']");
        this.userLocation = page.locator("[data-testid='user-location'], .user-location, [class*='location']");
        this.userCompany = page.locator("[data-testid='user-company'], .user-company, [class*='company']");
        this.userWebsite = page.locator("[data-testid='user-website'], .user-website, [class*='website'], a[class*='blog']");
        this.followersCount = page.locator("[data-testid='followers-count'], .followers-count, [class*='followers'] .count");
        this.followingCount = page.locator("[data-testid='following-count'], .following-count, [class*='following'] .count");
        this.reposCount = page.locator("[data-testid='repos-count'], .repos-count, [class*='repos'] .count");
        this.gistsCount = page.locator("[data-testid='gists-count'], .gists-count, [class*='gists'] .count");
        this.followButton = page.locator("[data-testid='follow-button'], button:has-text('Follow'), .follow-button");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, [class*='error'], [role='alert']");
        this.noDisponibleLabels = page.locator("text='No disponible', [data-testid*='not-available']");
        this.metricsContainer = page.locator("[data-testid='metrics-dashboard'], .metrics-container, .stats-container");
    }

    public void navigateToApplication() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public boolean isApplicationLoaded() {
        return searchInput.isVisible() || page.url().contains("github");
    }

    public void searchForUser(String username) {
        searchInput.waitFor();
        searchInput.fill(username);
        searchButton.click();
        page.waitForLoadState();
    }

    public boolean isProfileDisplayed() {
        return profileContainer.isVisible();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isUsernameVisible() {
        return userName.isVisible();
    }

    public String getUsernameText() {
        if (userName.isVisible()) {
            return userName.textContent().trim();
        }
        return "";
    }

    public String getFullNameText() {
        if (userFullName.isVisible()) {
            return userFullName.textContent().trim();
        }
        return "";
    }

    public String getBiographyText() {
        if (userBiography.isVisible()) {
            return userBiography.textContent().trim();
        }
        return "";
    }

    public String getLocationText() {
        if (userLocation.isVisible()) {
            return userLocation.textContent().trim();
        }
        return "";
    }

    public String getCompanyText() {
        if (userCompany.isVisible()) {
            return userCompany.textContent().trim();
        }
        return "";
    }

    public String getWebsiteText() {
        if (userWebsite.isVisible()) {
            return userWebsite.textContent().trim();
        }
        return "";
    }

    public String getFollowersCount() {
        if (followersCount.isVisible()) {
            return followersCount.textContent().trim();
        }
        return "0";
    }

    public String getFollowingCount() {
        if (followingCount.isVisible()) {
            return followingCount.textContent().trim();
        }
        return "0";
    }

    public String getReposCount() {
        if (reposCount.isVisible()) {
            return reposCount.textContent().trim();
        }
        return "0";
    }

    public String getGistsCount() {
        if (gistsCount.isVisible()) {
            return gistsCount.textContent().trim();
        }
        return "0";
    }

    public boolean hasNoDisponibleLabels() {
        return noDisponibleLabels.count() > 0;
    }

    public boolean areNoDisponibleLabelsConsistentlyStyled() {
        if (noDisponibleLabels.count() == 0) {
            return true;
        }

        List<Locator> labels = noDisponibleLabels.all();
        if (labels.size() <= 1) {
            return true;
        }

        String firstFontSize = labels.get(0).evaluate("el => window.getComputedStyle(el).fontSize").toString();
        String firstColor = labels.get(0).evaluate("el => window.getComputedStyle(el).color").toString();
        String firstFontFamily = labels.get(0).evaluate("el => window.getComputedStyle(el).fontFamily").toString();

        for (int i = 1; i < labels.size(); i++) {
            String currentFontSize = labels.get(i).evaluate("el => window.getComputedStyle(el).fontSize").toString();
            String currentColor = labels.get(i).evaluate("el => window.getComputedStyle(el).color").toString();
            String currentFontFamily = labels.get(i).evaluate("el => window.getComputedStyle(el).fontFamily").toString();

            if (!firstFontSize.equals(currentFontSize) || 
                !firstColor.equals(currentColor) || 
                !firstFontFamily.equals(currentFontFamily)) {
                return false;
            }
        }
        return true;
    }

    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        if (errorMessage.isVisible()) {
            return errorMessage.textContent().trim();
        }
        return "";
    }

    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public boolean isMetricsDashboardVisible() {
        return metricsContainer.isVisible();
    }
}