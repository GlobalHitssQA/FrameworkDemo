package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.BoundingBox;
import java.util.List;

public class GitHubProfileSearchPage {
    private Page page;
    
    // Locators - INFERIDOS (basados en buenas prácticas y estructura típica de componentes de búsqueda)
    private Locator searchInput;
    private Locator searchButton;
    private Locator profileContainer;
    private Locator followersListSection;
    private Locator followerEntries;
    private Locator followerAvatars;
    
    private static final String BASE_URL = "https://github.com";

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='search-input'], input[type='text'][placeholder*='username' i], #username-search");
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label*='search' i], button.search-btn");
        this.profileContainer = page.locator("[data-testid='profile-container'], .profile-section, #profile-content");
        this.followersListSection = page.locator("[data-testid='followers-list'], .followers-section, #followers-container");
        this.followerEntries = page.locator("[data-testid='follower-entry'], .follower-item, .followers-list-item");
        this.followerAvatars = page.locator("[data-testid='follower-avatar'], .follower-avatar img, .follower-item img[alt*='avatar' i]");
    }

    public void navigateToSearchPage() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public boolean isSearchInterfaceDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
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
        profileContainer.waitFor(new Locator.WaitForOptions().setTimeout(5000));
    }

    public boolean isFollowersListVisible() {
        return followersListSection.isVisible();
    }

    public int getFollowersCount() {
        return followerEntries.count();
    }

    public boolean isFollowerAvatarVisible(int index) {
        Locator avatar = followerAvatars.nth(index);
        return avatar.isVisible();
    }

    public boolean isFollowerAvatarBroken(int index) {
        Locator avatar = followerAvatars.nth(index);
        
        // Verificar si el atributo naturalWidth es 0 (indica imagen rota)
        Object naturalWidth = avatar.evaluate("el => el.naturalWidth");
        Object naturalHeight = avatar.evaluate("el => el.naturalHeight");
        
        if (naturalWidth instanceof Integer && naturalHeight instanceof Integer) {
            return (Integer) naturalWidth == 0 || (Integer) naturalHeight == 0;
        }
        
        return false;
    }

    public int[] getFollowerAvatarDimensions(int index) {
        Locator avatar = followerAvatars.nth(index);
        BoundingBox box = avatar.boundingBox();
        
        if (box != null) {
            return new int[]{(int) box.width, (int) box.height};
        }
        
        return new int[]{0, 0};
    }
}