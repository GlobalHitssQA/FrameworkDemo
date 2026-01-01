package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitUntilState;

/**
 * Page Object para la página de perfil de GitHub.
 * Locators extraídos mediante inspección real con Playwright MCP.
 */
public class GitHubProfilePage {

    private final Page page;
    
    // Locators REALES extraídos con Playwright
    private final Locator profileCard;
    private final Locator avatar;
    private final Locator fullName;
    private final Locator username;
    private final Locator biography;
    private final Locator followersLink;
    private final Locator followingLink;
    private final Locator location;
    private final Locator organization;
    private final Locator website;
    private final Locator followButton;
    private final Locator vcardDetails;
    private final Locator userProfileNav;

    public GitHubProfilePage(Page page) {
        this.page = page;
        
        // Locators REALES extraídos de GitHub (fuente: playwright)
        this.profileCard = page.locator(".h-card");
        this.avatar = page.locator("img.avatar-user");
        this.fullName = page.locator(".vcard-fullname");
        this.username = page.locator(".vcard-username");
        this.biography = page.locator("[data-bio-text]");
        this.followersLink = page.locator("a[href*='tab=followers']");
        this.followingLink = page.locator("a[href*='tab=following']");
        this.location = page.locator("[itemprop='homeLocation']");
        this.organization = page.locator("[itemprop='worksFor']");
        this.website = page.locator("[itemprop='url']");
        this.followButton = page.locator("a:has-text('Follow')").first();
        this.vcardDetails = page.locator(".vcard-details");
        this.userProfileNav = page.locator("nav[aria-label='User profile']");
    }

    /**
     * Navega a la URL base de GitHub
     */
    public void navigateToBaseUrl(String baseUrl) {
        page.navigate(baseUrl, new Page.NavigateOptions()
                .setWaitUntil(WaitUntilState.DOMCONTENTLOADED));
    }

    /**
     * Navega directamente al perfil de un usuario
     */
    public void navigateToUserProfile(String username) {
        page.navigate("https://github.com/" + username, new Page.NavigateOptions()
                .setWaitUntil(WaitUntilState.DOMCONTENTLOADED));
    }

    /**
     * Verifica si la página se ha cargado correctamente
     */
    public boolean isPageLoaded() {
        return page.title() != null && !page.title().isEmpty();
    }

    /**
     * Verifica si el perfil del usuario se ha cargado
     */
    public boolean isProfileLoaded() {
        return profileCard.isVisible();
    }

    /**
     * Verifica si la sección de información del usuario está visible
     */
    public boolean isUserInfoSectionVisible() {
        return profileCard.isVisible() && (fullName.isVisible() || username.isVisible());
    }

    /**
     * Obtiene el texto de la biografía
     * @return texto de la biografía o cadena vacía si no existe
     */
    public String getBiographyText() {
        if (biography.isVisible()) {
            String text = biography.textContent();
            return text != null ? text.trim() : "";
        }
        return "";
    }

    /**
     * Verifica si el campo de biografía está vacío
     */
    public boolean isBiographyEmpty() {
        String bioText = getBiographyText();
        return bioText.isEmpty() || bioText.equals("No disponible");
    }

    /**
     * Obtiene el nombre completo del usuario
     */
    public String getFullName() {
        if (fullName.isVisible()) {
            String text = fullName.textContent();
            return text != null ? text.trim() : "";
        }
        return "";
    }

    /**
     * Obtiene el username del usuario
     */
    public String getUsername() {
        if (username.isVisible()) {
            String text = username.textContent();
            return text != null ? text.trim() : "";
        }
        return "";
    }

    /**
     * Verifica si el avatar está visible
     */
    public boolean isAvatarVisible() {
        return avatar.isVisible();
    }

    /**
     * Verifica si el enlace de followers está visible
     */
    public boolean isFollowersVisible() {
        return followersLink.isVisible();
    }

    /**
     * Obtiene el texto de followers
     */
    public String getFollowersText() {
        if (followersLink.isVisible()) {
            String text = followersLink.textContent();
            return text != null ? text.trim() : "";
        }
        return "";
    }

    /**
     * Verifica si el enlace de following está visible
     */
    public boolean isFollowingVisible() {
        return followingLink.isVisible();
    }

    /**
     * Obtiene el texto de following
     */
    public String getFollowingText() {
        if (followingLink.isVisible()) {
            String text = followingLink.textContent();
            return text != null ? text.trim() : "";
        }
        return "";
    }

    /**
     * Verifica si la ubicación está visible
     */
    public boolean isLocationVisible() {
        return location.isVisible();
    }

    /**
     * Obtiene el texto de la ubicación
     */
    public String getLocationText() {
        if (location.isVisible()) {
            String text = location.textContent();
            return text != null ? text.trim() : "";
        }
        return "";
    }

    /**
     * Verifica si la organización está visible
     */
    public boolean isOrganizationVisible() {
        return organization.isVisible();
    }

    /**
     * Obtiene el texto de la organización
     */
    public String getOrganizationText() {
        if (organization.isVisible()) {
            String text = organization.textContent();
            return text != null ? text.trim() : "";
        }
        return "";
    }

    /**
     * Verifica si el enlace del sitio web está visible
     */
    public boolean isWebsiteVisible() {
        return website.isVisible();
    }

    /**
     * Obtiene el texto/URL del sitio web
     */
    public String getWebsiteText() {
        if (website.isVisible()) {
            String text = website.textContent();
            return text != null ? text.trim() : "";
        }
        return "";
    }

    /**
     * Hace clic en el botón Follow
     */
    public void clickFollowButton() {
        if (followButton.isVisible()) {
            followButton.click();
        }
    }

    /**
     * Verifica si el botón Follow está visible
     */
    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    /**
     * Hace clic en el enlace de followers
     */
    public void clickFollowersLink() {
        if (followersLink.isVisible()) {
            followersLink.click();
        }
    }

    /**
     * Hace clic en el enlace de following
     */
    public void clickFollowingLink() {
        if (followingLink.isVisible()) {
            followingLink.click();
        }
    }

    /**
     * Verifica si la navegación del perfil está visible
     */
    public boolean isProfileNavVisible() {
        return userProfileNav.isVisible();
    }

    /**
     * Verifica si los detalles de vcard están visibles
     */
    public boolean isVcardDetailsVisible() {
        return vcardDetails.isVisible();
    }
}