package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Locators - INFERIDOS (componente personalizado de búsqueda de perfiles GitHub)
    private Locator searchInput;
    private Locator searchButton;
    private Locator profileSection;
    private Locator fullNameText;
    private Locator usernameText;
    private Locator userAvatar;
    private Locator errorMessage;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        // Locators inferidos basados en buenas prácticas para el componente personalizado
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.profileSection = page.locator("[data-testid='profile-section']");
        this.fullNameText = page.locator("[data-testid='user-fullname']");
        this.usernameText = page.locator("[data-testid='user-username']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.errorMessage = page.locator("[data-testid='error-message']");
    }

    public void navigateToComponent() {
        page.navigate(BASE_URL);
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileToLoad() {
        profileSection.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isProfileSectionVisible() {
        return profileSection.isVisible();
    }

    public String getFullName() {
        return fullNameText.textContent().trim();
    }

    public String getUsername() {
        return usernameText.textContent().trim();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent().trim();
    }
}