package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.LoadState;

public class GitHubSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator userProfile;
    private Locator userAvatar;
    private Locator followersList;
    private Locator followerAvatars;

    public GitHubSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='search-input'], input[type='text'][placeholder*='username'], input#search-user");
        this.searchButton = page.locator("[data-testid='search-button'], button[type='submit'], button.search-btn");
        this.userProfile = page.locator("[data-testid='user-profile'], .user-profile, .profile-container");
        this.userAvatar = page.locator("[data-testid='user-avatar'], .user-avatar img, .profile-avatar img");
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, .followers-container");
        this.followerAvatars = page.locator("[data-testid='follower-avatar'], .follower-avatar img, .followers-list img");
    }

    public void navigate() {
        page.navigate("https://github.com");
        page.waitForLoadState(LoadState.DOMCONTENTLOADED);
    }

    public boolean isSearchInterfaceVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(2000);
    }

    public boolean isProfileVisible() {
        return userProfile.isVisible();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isAvatarLoaded() {
        String naturalWidth = userAvatar.evaluate("el => el.naturalWidth").toString();
        return !naturalWidth.equals("0");
    }

    public int getAvatarWidth() {
        Object width = userAvatar.evaluate("el => el.naturalWidth");
        return Integer.parseInt(width.toString());
    }

    public int getAvatarHeight() {
        Object height = userAvatar.evaluate("el => el.naturalHeight");
        return Integer.parseInt(height.toString());
    }

    public String getAvatarSrc() {
        return userAvatar.getAttribute("src");
    }

    public void scrollToFollowersList() {
        followersList.scrollIntoViewIfNeeded();
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public int getFollowerAvatarCount() {
        return followerAvatars.count();
    }

    public boolean areAllFollowerAvatarsLoaded() {
        int count = followerAvatars.count();
        for (int i = 0; i < count; i++) {
            Locator avatar = followerAvatars.nth(i);
            String naturalWidth = avatar.evaluate("el => el.naturalWidth").toString();
            if (naturalWidth.equals("0")) {
                return false;
            }
        }
        return true;
    }
}