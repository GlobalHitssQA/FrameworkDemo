package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;
import com.microsoft.playwright.APIRequest;
import com.microsoft.playwright.APIRequestContext;
import com.microsoft.playwright.APIResponse;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Page Object for GitHub User Profile page.
 * Locators: REALES (extraídos con Playwright MCP)
 */
public class GitHubProfilePage {

    private Page page;
    private String currentUsername;

    // Base URLs - locators reales extraídos con Playwright
    private static final String GITHUB_BASE_URL = "https://github.com";
    private static final String GIST_BASE_URL = "https://gist.github.com";
    private static final String API_BASE_URL = "https://api.github.com/users/";

    // Locators REALES extraídos con Playwright MCP
    // Avatar del usuario
    private Locator userAvatar;

    // Nombre completo y username en el heading del perfil
    private Locator profileHeading;

    // Link de followers con el contador (ej: "21.4k followers")
    private Locator followersLink;

    // Link de following con el contador (ej: "9 following")
    private Locator followingLink;

    // Tab de Repositories con contador (ej: "Repositories 8")
    private Locator repositoriesTab;

    // Tab de Gists con contador en la página de gists
    private Locator gistsTab;

    // Botón Follow
    private Locator followButton;

    // Información de ubicación
    private Locator locationInfo;

    // Información de organización
    private Locator organizationLink;

    // Link del blog/web
    private Locator blogLink;

    public GitHubProfilePage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Locators REALES extraídos de la inspección con Playwright MCP
        // Avatar del usuario - real locator
        this.userAvatar = page.locator("a[href*='avatars.githubusercontent.com'] img");

        // Heading del perfil con nombre y username - real locator
        this.profileHeading = page.locator("h1.vcard-names, h1[class*='vcard']");

        // Link de followers - real locator extraído: "21.4k followers"
        this.followersLink = page.locator("a[href$='?tab=followers']");

        // Link de following - real locator extraído: "9 following"
        this.followingLink = page.locator("a[href$='?tab=following']");

        // Tab de repositorios - real locator extraído del nav
        this.repositoriesTab = page.locator("nav[aria-label='User profile'] a[href$='?tab=repositories']");

        // Tab de Gists (en gist.github.com) - real locator
        this.gistsTab = page.locator("nav[aria-label='Gist tab'] a[href*='/']:has-text('All gists')");

        // Botón Follow - real locator
        this.followButton = page.locator("a:has-text('Follow')[href*='login']");

        // Ubicación - real locator con aria-label
        this.locationInfo = page.locator("li[itemprop='homeLocation'], li[aria-label*='location']");

        // Organización - real locator
        this.organizationLink = page.locator("li[aria-label*='Organization'] a");

        // Blog link - real locator
        this.blogLink = page.locator("li a[href*='github.blog'], li a[rel='nofollow']");
    }

    public void navigateToHomePage() {
        page.navigate(GITHUB_BASE_URL);
        page.waitForLoadState();
    }

    public void navigateToUserProfile(String username) {
        this.currentUsername = username;
        page.navigate(GITHUB_BASE_URL + "/" + username);
        page.waitForLoadState();
    }

    public void navigateToUserGists() {
        page.navigate(GIST_BASE_URL + "/" + currentUsername);
        page.waitForLoadState();
    }

    public void waitForProfileToLoad() {
        // Esperar a que el avatar del usuario sea visible
        userAvatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        // Esperar a que los contadores estén visibles
        followersLink.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    // Métodos para verificar visibilidad de métricas
    public boolean isReposMetricVisible() {
        return repositoriesTab.isVisible();
    }

    public boolean isFollowersMetricVisible() {
        return followersLink.isVisible();
    }

    public boolean isFollowingMetricVisible() {
        return followingLink.isVisible();
    }

    public boolean isGistsMetricVisible() {
        return gistsTab.isVisible();
    }

    // Métodos para obtener contadores de métricas desde la UI
    public String getReposCount() {
        // El tab muestra "Repositories 8" - extraer el número
        String tabText = repositoriesTab.textContent();
        return extractNumber(tabText);
    }

    public String getFollowersCount() {
        // El link muestra "21.4k followers" - extraer el número
        String linkText = followersLink.textContent();
        return normalizeCount(extractNumber(linkText));
    }

    public String getFollowingCount() {
        // El link muestra "9 following" - extraer el número
        String linkText = followingLink.textContent();
        return extractNumber(linkText);
    }

    public String getGistsCount() {
        // El tab muestra "All gists 8" - extraer el número
        String tabText = gistsTab.textContent();
        return extractNumber(tabText);
    }

    // Métodos para obtener datos desde la API de GitHub
    public String getReposCountFromAPI() {
        JsonObject userData = fetchUserDataFromAPI();
        return String.valueOf(userData.get("public_repos").getAsInt());
    }

    public String getFollowersCountFromAPI() {
        JsonObject userData = fetchUserDataFromAPI();
        return String.valueOf(userData.get("followers").getAsInt());
    }

    public String getFollowingCountFromAPI() {
        JsonObject userData = fetchUserDataFromAPI();
        return String.valueOf(userData.get("following").getAsInt());
    }

    public String getGistsCountFromAPI() {
        JsonObject userData = fetchUserDataFromAPI();
        return String.valueOf(userData.get("public_gists").getAsInt());
    }

    private JsonObject fetchUserDataFromAPI() {
        APIRequestContext request = page.context().request();
        APIResponse response = request.get(API_BASE_URL + currentUsername);
        String responseBody = response.text();
        return JsonParser.parseString(responseBody).getAsJsonObject();
    }

    // Métodos de interacción adicionales
    public void clickFollowButton() {
        followButton.click();
    }

    public void clickFollowersLink() {
        followersLink.click();
    }

    public void clickFollowingLink() {
        followingLink.click();
    }

    public void clickRepositoriesTab() {
        repositoriesTab.click();
    }

    public String getFullName() {
        return profileHeading.locator("span[itemprop='name'], span.vcard-fullname").textContent();
    }

    public String getUsername() {
        return profileHeading.locator("span[itemprop='additionalName'], span.vcard-username").textContent();
    }

    public String getLocation() {
        return locationInfo.textContent().trim();
    }

    public String getOrganization() {
        return organizationLink.textContent().trim();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    // Utilidades privadas
    private String extractNumber(String text) {
        if (text == null) return "0";
        // Extraer números del texto (ej: "Repositories 8" -> "8")
        String number = text.replaceAll("[^0-9.k]+", "");
        return number.isEmpty() ? "0" : number;
    }

    private String normalizeCount(String count) {
        // Convertir formatos como "21.4k" a número para comparación
        if (count == null) return "0";
        if (count.toLowerCase().contains("k")) {
            double value = Double.parseDouble(count.toLowerCase().replace("k", ""));
            return String.valueOf((int)(value * 1000));
        }
        return count;
    }
}