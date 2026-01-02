package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

/**
 * Page Object for GitHub User Profile Page
 * Locators: REALES (extraídos con Playwright MCP)
 */
public class GitHubProfilePage {

    private Page page;
    
    // Locators reales extraídos de GitHub
    private Locator userAvatar;
    private Locator fullName;
    private Locator username;
    private Locator followersLink;
    private Locator followingLink;
    private Locator followButton;
    private Locator locationInfo;
    private Locator organizationInfo;
    private Locator editProfileButton;
    private Locator settingsLink;

    public GitHubProfilePage(Page page) {
        this.page = page;
        this.userAvatar = page.locator("img[alt^='View'][alt$='full-sized avatar']");
        this.fullName = page.locator("h1 span.p-name, h1 span.vcard-fullname");
        this.username = page.locator("h1 span.p-nickname, h1 span.vcard-username");
        this.followersLink = page.locator("a[href$='tab=followers']");
        this.followingLink = page.locator("a[href$='tab=following']");
        this.followButton = page.locator("a:has-text('Follow'), button:has-text('Follow')").first();
        this.locationInfo = page.locator("li[itemprop='homeLocation'], li:has(svg) >> text=/Portland|location/i").first();
        this.organizationInfo = page.locator("li[itemprop='worksFor'], li:has(svg) >> text=/Foundation|organization/i").first();
        this.editProfileButton = page.locator("button:has-text('Edit profile'), a:has-text('Edit profile')");
        this.settingsLink = page.locator("a[href$='/settings/profile']");
    }

    public void navigateToProfile(String username) {
        page.navigate("https://github.com/" + username);
        page.waitForLoadState();
    }

    public boolean isProfileDisplayed() {
        return userAvatar.isVisible() || username.isVisible();
    }

    public boolean hasFollowers() {
        return followersLink.isVisible();
    }

    public void clickFollowersLink() {
        followersLink.click();
        page.waitForLoadState();
    }

    public String getDisplayedUsername() {
        if (username.isVisible()) {
            return username.textContent().trim();
        }
        return null;
    }

    public String getFullName() {
        if (fullName.isVisible()) {
            return fullName.textContent().trim();
        }
        return null;
    }

    public boolean isEditProfileButtonVisible() {
        return editProfileButton.isVisible();
    }

    public boolean isSettingsLinkVisible() {
        return settingsLink.isVisible();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public String getLocation() {
        if (locationInfo.isVisible()) {
            return locationInfo.textContent().trim();
        }
        return null;
    }

    public String getOrganization() {
        if (organizationInfo.isVisible()) {
            return organizationInfo.textContent().trim();
        }
        return null;
    }
}

// Archivo separado: GitHubFollowersPage.java
package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

/**
 * Page Object for GitHub Followers List Page
 * Locators: REALES (extraídos con Playwright MCP)
 */
public class GitHubFollowersPage {

    private Page page;
    
    // Locators reales extraídos de la página de seguidores de GitHub
    private Locator followersList;
    private Locator followerItems;
    private Locator nextPageLink;
    private Locator previousPageLink;

    public GitHubFollowersPage(Page page) {
        this.page = page;
        // Lista de seguidores - contenedor principal de la sección de followers
        this.followersList = page.locator("main div.d-flex.flex-wrap, main > div > div:nth-child(2)").first();
        // Cada item de seguidor individual
        this.followerItems = page.locator("main div[class*='d-flex']:has(img[alt^='@'])");
        this.nextPageLink = page.locator("a:has-text('Next')");
        this.previousPageLink = page.locator("a:has-text('Previous'), div:has-text('Previous')");
    }

    public void navigateToFollowersPage(String username) {
        page.navigate("https://github.com/" + username + "?tab=followers");
        page.waitForLoadState();
    }

    public boolean isFollowersListVisible() {
        return followerItems.first().isVisible();
    }

    public int getFollowersCount() {
        return followerItems.count();
    }

    public boolean followerHasAvatar(int index) {
        Locator follower = followerItems.nth(index);
        Locator avatar = follower.locator("img[alt^='@']");
        return avatar.isVisible();
    }

    public boolean followerHasUsername(int index) {
        Locator follower = followerItems.nth(index);
        Locator usernameLink = follower.locator("a[href^='/']:not([href*='login'])").first();
        return usernameLink.isVisible();
    }

    public boolean followerHasProfileLink(int index) {
        Locator follower = followerItems.nth(index);
        Locator profileLink = follower.locator("a[href^='/']:not([href*='login'])").first();
        return profileLink.isVisible();
    }

    public String getFollowerUsername(int index) {
        Locator follower = followerItems.nth(index);
        // El avatar tiene alt="@username"
        Locator avatar = follower.locator("img[alt^='@']");
        String altText = avatar.getAttribute("alt");
        if (altText != null && altText.startsWith("@")) {
            return altText.substring(1); // Remover el @
        }
        return null;
    }

    public void clickFollowerProfileLink(int index) {
        Locator follower = followerItems.nth(index);
        Locator profileLink = follower.locator("a[href^='/']:not([href*='login'])").first();
        profileLink.click();
        page.waitForLoadState();
    }

    public void clickFollowerAvatar(int index) {
        Locator follower = followerItems.nth(index);
        Locator avatarLink = follower.locator("a:has(img[alt^='@'])");
        avatarLink.click();
        page.waitForLoadState();
    }

    public String getFollowerBio(int index) {
        Locator follower = followerItems.nth(index);
        Locator bio = follower.locator("div:not(:has(a)):not(:has(img))").first();
        if (bio.isVisible()) {
            return bio.textContent().trim();
        }
        return null;
    }

    public boolean hasNextPage() {
        return nextPageLink.isVisible();
    }

    public void goToNextPage() {
        nextPageLink.click();
        page.waitForLoadState();
    }

    public boolean hasPreviousPage() {
        return previousPageLink.isVisible() && !previousPageLink.isDisabled();
    }
}