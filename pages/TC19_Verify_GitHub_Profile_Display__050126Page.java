package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class GitHubProfileSearchPage {
    
    private Page page;
    
    // Locators - Inferidos basados en buenas prácticas
    private Locator searchInput;
    private Locator searchButton;
    private Locator profileContainer;
    private Locator userAvatar;
    private Locator username;
    private Locator fullName;
    private Locator bio;
    private Locator location;
    private Locator company;
    private Locator websiteLink;
    private Locator followersCount;
    private Locator followingCount;
    private Locator repositoriesCount;
    private Locator gistsCount;
    private Locator followButton;
    private Locator followersList;
    private Locator followersLink;
    private Locator followingLink;
    private Locator editButton;
    private Locator editProfileButton;
    private Locator requestsIndicator;
    private Locator errorMessage;
    
    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        
        // Inicialización de locators inferidos
        this.searchInput = page.locator("[data-testid='search-input'], input[placeholder*='username'], input#username-search");
        this.searchButton = page.locator("[data-testid='search-button'], button[type='submit']:has-text('Search'), button.search-btn");
        this.profileContainer = page.locator("[data-testid='profile-container'], .profile-display, #profile-info");
        this.userAvatar = page.locator("[data-testid='user-avatar'], .avatar img, img.profile-avatar");
        this.username = page.locator("[data-testid='username'], .username, #user-name");
        this.fullName = page.locator("[data-testid='full-name'], .full-name, #full-name");
        this.bio = page.locator("[data-testid='user-bio'], .bio, .user-bio");
        this.location = page.locator("[data-testid='user-location'], .location, #user-location");
        this.company = page.locator("[data-testid='user-company'], .company, #user-company");
        this.websiteLink = page.locator("[data-testid='user-website'], .website-link, a.user-website");
        this.followersCount = page.locator("[data-testid='followers-count'], .followers-count, #followers");
        this.followingCount = page.locator("[data-testid='following-count'], .following-count, #following");
        this.repositoriesCount = page.locator("[data-testid='repos-count'], .repos-count, #repositories");
        this.gistsCount = page.locator("[data-testid='gists-count'], .gists-count, #gists");
        this.followButton = page.locator("[data-testid='follow-button'], button:has-text('Follow'), .follow-btn");
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, #followers-container");
        this.followersLink = page.locator("[data-testid='followers-link'], a:has-text('followers'), .followers-link");
        this.followingLink = page.locator("[data-testid='following-link'], a:has-text('following'), .following-link");
        this.editButton = page.locator("[data-testid='edit-button'], button:has-text('Edit'), .edit-btn");
        this.editProfileButton = page.locator("[data-testid='edit-profile-button'], button:has-text('Edit Profile'), .edit-profile-btn");
        this.requestsIndicator = page.locator("[data-testid='requests-indicator'], .requests-limit, #api-requests");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-msg, .user-not-found");
    }
    
    // Métodos de interacción
    
    public boolean isSearchComponentDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
    }
    
    public void enterUsername(String username) {
        searchInput.fill(username);
    }
    
    public boolean isUsernameEntered(String expectedUsername) {
        return searchInput.inputValue().equals(expectedUsername);
    }
    
    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(2000); // Wait for profile to load
    }
    
    public boolean isProfileDisplayed() {
        return profileContainer.isVisible();
    }
    
    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }
    
    public boolean isUsernameVisible() {
        return username.isVisible();
    }
    
    public boolean isFollowersCountVisible() {
        return followersCount.isVisible();
    }
    
    public boolean isFollowingCountVisible() {
        return followingCount.isVisible();
    }
    
    public boolean isRepositoriesCountVisible() {
        return repositoriesCount.isVisible();
    }
    
    public boolean isEditButtonPresent() {
        return editButton.count() > 0 || editProfileButton.count() > 0;
    }
    
    public boolean areEditableFieldsPresent() {
        // Verificar que no existen campos de input editables en el perfil
        Locator editableInputs = page.locator("[data-testid='profile-container'] input:not([readonly]):not([disabled]), .profile-display input:not([readonly]):not([disabled])");
        Locator editableTextareas = page.locator("[data-testid='profile-container'] textarea:not([readonly]):not([disabled]), .profile-display textarea:not([readonly]):not([disabled])");
        return editableInputs.count() > 0 || editableTextareas.count() > 0;
    }
    
    public boolean areAllFieldsReadOnly() {
        // Verificar que todos los campos son de solo lectura (span, div, p, pero no input/textarea editables)
        return !areEditableFieldsPresent();
    }
    
    public boolean isUsernameFieldEditable() {
        return username.evaluate("el => el.tagName === 'INPUT' && !el.readOnly && !el.disabled").toString().equals("true");
    }
    
    public boolean isBioFieldEditable() {
        return bio.count() > 0 && bio.evaluate("el => (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && !el.readOnly && !el.disabled").toString().equals("true");
    }
    
    public boolean isLocationFieldEditable() {
        return location.count() > 0 && location.evaluate("el => (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && !el.readOnly && !el.disabled").toString().equals("true");
    }
    
    public boolean isCompanyFieldEditable() {
        return company.count() > 0 && company.evaluate("el => (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && !el.readOnly && !el.disabled").toString().equals("true");
    }
    
    public boolean isFollowButtonVisible() {
        return followButton.count() > 0 && followButton.isVisible();
    }
    
    public boolean isFollowersLinkClickable() {
        return followersLink.count() > 0 && followersLink.isVisible();
    }
    
    public boolean isFollowingLinkClickable() {
        return followingLink.count() > 0 && followingLink.isVisible();
    }
    
    public boolean areEditingCapabilitiesEnabled() {
        // Verificar que no hay botones de edición, guardado o cancelación
        Locator editButtons = page.locator("button:has-text('Edit'), button:has-text('Save'), button:has-text('Cancel'), [data-testid='edit-button'], [data-testid='save-button']");
        return editButtons.count() > 0;
    }
    
    public String getUsername() {
        return username.textContent();
    }
    
    public String getFollowersCount() {
        return followersCount.textContent();
    }
    
    public String getFollowingCount() {
        return followingCount.textContent();
    }
    
    public boolean isErrorMessageDisplayed() {
        return errorMessage.count() > 0 && errorMessage.isVisible();
    }
}